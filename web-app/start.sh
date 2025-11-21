#!/bin/bash

# Start script for Disease Prediction Web App
# This script starts both the backend and frontend servers

echo "🚀 Starting Disease Prediction Web App..."
echo ""

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if pnpm is available
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
fi

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

# Check if model exists
MODEL_PATH="$PROJECT_ROOT/saved_model/random_forest.joblib"
if [ ! -f "$MODEL_PATH" ]; then
    echo "⚠️  Warning: Model file not found at $MODEL_PATH"
    echo "   Please make sure you have trained the models first."
    echo ""
fi

# Install backend dependencies if needed
if [ ! -d "$SCRIPT_DIR/api/__pycache__" ]; then
    echo "📦 Installing backend dependencies..."
    cd "$SCRIPT_DIR/api"
    pip install -r requirements.txt
    cd "$SCRIPT_DIR"
fi

# Install frontend dependencies if needed
if [ ! -d "$SCRIPT_DIR/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    pnpm install
fi

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "Starting servers..."
echo "  - Backend API: http://localhost:8000"
echo "  - Frontend App: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Start backend in background
cd "$SCRIPT_DIR/api"
python3 main.py &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 2

# Start frontend
cd "$SCRIPT_DIR"
pnpm dev &
FRONTEND_PID=$!

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit
}

# Trap Ctrl+C
trap cleanup INT TERM

# Wait for both processes
wait

