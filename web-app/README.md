# Disease Prediction Web App

A modern, simple web application for predicting diseases from symptoms using machine learning.

## Features

- 🎨 Beautiful, modern UI with Tailwind CSS
- 🔍 Search functionality for symptoms
- ⚡ Fast and responsive
- 🎯 Easy symptom selection with checkboxes
- 📱 Mobile-friendly design

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: FastAPI (Python)
- **ML Model**: Random Forest (scikit-learn)

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- pnpm (package manager)
- Python 3.8+
- Pre-trained ML models in `../saved_model/` directory

### Installation

1. **Install frontend dependencies**:
   ```bash
   cd web-app
   pnpm install
   ```

2. **Install backend dependencies**:
   ```bash
   cd api
   pip install -r requirements.txt
   ```

### Running the Application

1. **Start the backend server** (in one terminal):
   ```bash
   cd web-app/api
   python main.py
   ```
   The API will run on `http://localhost:8000`

2. **Start the frontend** (in another terminal):
   ```bash
   cd web-app
   pnpm dev
   ```
   The app will open at `http://localhost:3000`

### Building for Production

```bash
# Build frontend
pnpm build

# The built files will be in the `dist` directory
```

## Project Structure

```
web-app/
├── api/
│   ├── main.py              # FastAPI backend server
│   └── requirements.txt     # Python dependencies
├── src/
│   ├── components/
│   │   ├── SymptomSelector.jsx
│   │   └── PredictionResult.jsx
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## API Endpoints

- `GET /` - API status
- `GET /api/health` - Health check
- `POST /api/predict` - Predict disease from symptoms
- `GET /api/symptoms` - Get list of all available symptoms

## Usage

1. Open the web app in your browser
2. Search and select symptoms from the list
3. Click "Predict Disease" button
4. View the predicted disease result

## Important Disclaimer

⚠️ **This application is for demonstration purposes only. Always consult with a qualified healthcare professional for accurate diagnosis and treatment.**

