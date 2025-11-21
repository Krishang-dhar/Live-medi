#!/usr/bin/env python3
"""
FastAPI backend server for disease prediction web app
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import pandas as pd
import numpy as np
from joblib import load
import os

app = FastAPI(title="Disease Prediction API")

# CORS middleware to allow frontend to connect
# Allow all origins for Vercel deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for Vercel
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
# Try multiple possible paths (including Vercel serverless paths)
# In Vercel, files are relative to the function location
possible_paths = [
    os.path.join(os.path.dirname(__file__), "..", "saved_model", "random_forest.joblib"),
    os.path.join(os.path.dirname(__file__), "..", "..", "saved_model", "random_forest.joblib"),
    os.path.join(os.path.dirname(__file__), "..", "..", "..", "saved_model", "random_forest.joblib"),
    os.path.join(os.getcwd(), "saved_model", "random_forest.joblib"),
    os.path.join(os.getcwd(), "..", "saved_model", "random_forest.joblib"),
    "./saved_model/random_forest.joblib",
    "../saved_model/random_forest.joblib",
    "../../saved_model/random_forest.joblib",
]

model = None
MODEL_PATH = None

for path in possible_paths:
    abs_path = os.path.abspath(path)
    if os.path.exists(abs_path):
        MODEL_PATH = abs_path
        try:
            model = load(abs_path)
            print(f"✅ Model loaded successfully from: {abs_path}")
            break
        except Exception as e:
            print(f"Error loading model from {abs_path}: {e}")
            continue

if model is None:
    print("⚠️  Warning: Could not load model. Please ensure the model file exists.")
    print("   Expected locations:")
    for path in possible_paths:
        print(f"   - {os.path.abspath(path)}")

# All available symptoms (must match the order expected by the model)
SYMPTOM_LIST = [
    'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 
    'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 
    'burning_micturition', 'spotting_ urination', 'fatigue', 'weight_gain', 'anxiety', 
    'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 
    'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 
    'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 
    'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 
    'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 
    'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 
    'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 
    'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 
    'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 
    'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 
    'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 
    'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 
    'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 
    'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 
    'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 
    'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine', 
    'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 
    'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 
    'belly_pain', 'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes', 
    'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 
    'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 
    'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 
    'history_of_alcohol_consumption', 'fluid_overload.1', 'blood_in_sputum', 
    'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 
    'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 
    'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze'
]


class SymptomRequest(BaseModel):
    symptoms: List[str]


@app.get("/")
def read_root():
    return {
        "message": "Disease Prediction API",
        "status": "running",
        "model_loaded": model is not None
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": model is not None
    }


@app.post("/api/predict")
def predict_disease(request: SymptomRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded. Please check server logs.")
    
    if not request.symptoms:
        raise HTTPException(status_code=400, detail="No symptoms provided")
    
    # Create symptom dictionary with all symptoms set to 0
    symptoms_dict = {symptom: 0 for symptom in SYMPTOM_LIST}
    
    # Set selected symptoms to 1
    for symptom in request.symptoms:
        if symptom not in SYMPTOM_LIST:
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid symptom: {symptom}"
            )
        symptoms_dict[symptom] = 1
    
    # Create DataFrame with symptoms in the correct order
    df_test = pd.DataFrame(columns=SYMPTOM_LIST)
    df_test.loc[0] = [symptoms_dict[symptom] for symptom in SYMPTOM_LIST]
    
    # Make prediction
    try:
        result = model.predict(df_test)
        predicted_disease = result[0]
        
        return {
            "disease": predicted_disease,
            "symptoms_count": len(request.symptoms)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


@app.get("/api/symptoms")
def get_symptoms():
    """Get list of all available symptoms"""
    return {"symptoms": SYMPTOM_LIST}


# Vercel serverless function handler
# Must be at the end of the file
from mangum import Mangum
handler = Mangum(app, lifespan="off")

# Export handler for Vercel
__all__ = ['handler']

# For local development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

