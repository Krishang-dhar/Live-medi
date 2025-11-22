import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

interface PredictionResponse {
  disease: string;
  symptoms_count: number;
  timestamp: string;
  model_used: string;
  confidence?: number;
}

interface ErrorResponse {
  error: string;
  code?: string;
  details?: string;
  note?: string;
}

// Enhanced Python prediction function with better error handling
async function predictWithPython(symptoms: string[]): Promise<PredictionResponse> {
  try {
    const scriptPath = path.join(process.cwd(), 'scripts', 'predict_local.py');
    const symptomsJson = JSON.stringify(symptoms);
    
    // Execute Python script with timeout
    const { stdout, stderr } = await execAsync(
      `python3 "${scriptPath}" '${symptomsJson}'`,
      { timeout: 10000 } // 10 second timeout
    );
    
    // Filter out warnings (they go to stderr but aren't errors)
    if (stderr && !stderr.includes('Warning') && !stderr.trim().startsWith('Warning')) {
      console.error('Python script stderr:', stderr);
    }
    
    const result = JSON.parse(stdout.trim());
    
    if (result.error) {
      throw new Error(result.error);
    }
    
    if (!result.disease) {
      throw new Error('No prediction returned from model');
    }
    
    return {
      disease: result.disease,
      symptoms_count: symptoms.length,
      timestamp: new Date().toISOString(),
      model_used: 'random_forest',
      confidence: result.confidence || undefined
    };
  } catch (error: any) {
    console.error('Python prediction error:', error);
    
    // Handle specific error types
    if (error.code === 'ETIMEDOUT' || error.signal === 'SIGTERM') {
      throw new Error('Prediction timeout - please try again');
    }
    
    if (error.message.includes('ENOENT')) {
      throw new Error('Prediction script not found - please check installation');
    }
    
    throw new Error(error.message || 'Prediction failed');
  }
}

// Validate symptoms input
function validateSymptoms(symptoms: unknown): symptoms is string[] {
  if (!Array.isArray(symptoms)) {
    return false;
  }
  
  if (symptoms.length === 0) {
    return false;
  }
  
  if (symptoms.length > 20) {
    return false; // Reasonable limit
  }
  
  return symptoms.every(s => typeof s === 'string' && s.length > 0);
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const body = await request.json();
    const { symptoms } = body;

    // Validate input
    if (!symptoms) {
      const errorResponse: ErrorResponse = {
        error: 'Missing symptoms parameter',
        code: 'MISSING_SYMPTOMS'
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    if (!validateSymptoms(symptoms)) {
      const errorResponse: ErrorResponse = {
        error: 'Invalid symptoms format. Please provide a non-empty array of symptom strings (max 20 symptoms)',
        code: 'INVALID_SYMPTOMS'
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    try {
      // Determine environment
      const isLocal = process.env.NODE_ENV === 'development' || !process.env.VERCEL;
      
      if (isLocal) {
        // Local development: Use Python script directly
        const prediction = await predictWithPython(symptoms);
        
        // Log performance
        const duration = Date.now() - startTime;
        console.log(`Prediction completed in ${duration}ms for ${symptoms.length} symptoms`);
        
        return NextResponse.json(prediction);
      } else {
        // Production: Use Python serverless function
        const baseUrl = process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}` 
          : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        
        const response = await fetch(`${baseUrl}/api/predict`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ symptoms }),
          signal: AbortSignal.timeout(15000) // 15 second timeout
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Prediction service unavailable');
        }

        const data = await response.json();
        return NextResponse.json({
          ...data,
          timestamp: new Date().toISOString(),
          model_used: data.model_used || 'random_forest'
        });
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`Prediction failed after ${duration}ms:`, error);
      
      const errorResponse: ErrorResponse = {
        error: error instanceof Error ? error.message : 'Prediction failed',
        code: 'PREDICTION_ERROR',
        details: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined,
        note: process.env.NODE_ENV === 'development' 
          ? 'Make sure Python dependencies are installed: pip install pandas numpy scikit-learn joblib'
          : 'Prediction service unavailable'
      };
      
      return NextResponse.json(errorResponse, { status: 500 });
    }
  } catch (error) {
    // JSON parsing error or other request errors
    const errorResponse: ErrorResponse = {
      error: 'Invalid request format',
      code: 'INVALID_REQUEST'
    };
    
    return NextResponse.json(errorResponse, { status: 400 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
