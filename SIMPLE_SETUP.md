# 🚀 How to Run on Localhost

## Prerequisites

1. **Python 3.11** (or 3.9+) installed
2. **Node.js 18+** installed  
3. **pnpm** installed (or npm)

## Step 1: Clone the Repository

```bash
git clone https://github.com/Krishang-dhar/Disease-Prediction-from-Symptoms.git
cd Disease-Prediction-from-Symptoms
```

## Step 2: Setup Backend (Python API)

### 2.1 Go to API folder
```bash
cd web-app/api
```

### 2.2 Create Virtual Environment
```bash
python3 -m venv venv
```

### 2.3 Activate Virtual Environment

**On Mac/Linux:**
```bash
source venv/bin/activate
```

**On Windows:**
```bash
venv\Scripts\activate
```

### 2.4 Install Dependencies
```bash
pip install -r requirements.txt
```

### 2.5 Make sure model file exists
Check if `saved_model/random_forest.joblib` exists in the root directory:
```bash
# From web-app/api folder, go back to root
cd ../../saved_model
ls -la random_forest.joblib
```

If model doesn't exist, you need to train it first (see Step 4).

### 2.6 Start Backend Server
```bash
# Make sure you're in web-app/api folder
python main.py
```

Backend will run on: `http://localhost:8000`

**Keep this terminal open!**

---

## Step 3: Setup Frontend (React App)

### 3.1 Open New Terminal

Open a **new terminal window** (keep backend running in first terminal)

### 3.2 Go to Web App folder
```bash
cd Disease-Prediction-from-Symptoms/web-app
```

### 3.3 Install Dependencies
```bash
pnpm install
```

**If pnpm not installed:**
```bash
npm install -g pnpm
# Then run: pnpm install
```

### 3.4 Start Frontend
```bash
pnpm dev
```

Frontend will run on: `http://localhost:3000`

---

## Step 4: Train Model (If needed)

If `saved_model/random_forest.joblib` doesn't exist:

### 4.1 Go to root directory
```bash
cd Disease-Prediction-from-Symptoms
```

### 4.2 Install training dependencies
```bash
pip install -r requirements.txt
```

### 4.3 Train the model
```bash
python train_all_models.py
```

This will create model files in `saved_model/` folder.

---

## Step 5: Access the App

1. **Frontend**: Open browser → `http://localhost:3000`
2. **Backend API**: `http://localhost:8000`
3. **API Health Check**: `http://localhost:8000/api/health`

---

## Quick Start (All Commands)

### Terminal 1 - Backend:
```bash
cd Disease-Prediction-from-Symptoms/web-app/api
python3 -m venv venv
source venv/bin/activate  # Mac/Linux
# OR
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
```

### Terminal 2 - Frontend:
```bash
cd Disease-Prediction-from-Symptoms/web-app
pnpm install
pnpm dev
```

---

## Troubleshooting

### Backend not starting?
- Check if port 8000 is already in use
- Make sure virtual environment is activated
- Verify all dependencies are installed: `pip list`

### Frontend not connecting to backend?
- Make sure backend is running on port 8000
- Check `vite.config.js` has correct proxy settings
- Try: `http://localhost:3000` in browser

### Model not found?
- Train the model first (Step 4)
- Check `saved_model/random_forest.joblib` exists
- Verify file path in `api/main.py`

### Port already in use?
- Change port in `vite.config.js` (frontend)
- Change port in `main.py` (backend)

---

## File Structure

```
Disease-Prediction-from-Symptoms/
├── web-app/
│   ├── api/
│   │   ├── main.py          # Backend API
│   │   └── requirements.txt # Python dependencies
│   ├── src/
│   │   └── App.jsx           # Frontend React app
│   └── package.json          # Node.js dependencies
├── saved_model/
│   └── random_forest.joblib  # ML Model (needs to exist)
└── requirements.txt          # Training dependencies
```

---

## That's It! 🎉

1. Backend running on port 8000 ✅
2. Frontend running on port 3000 ✅
3. Open `http://localhost:3000` in browser ✅
4. Start predicting diseases! 🏥

---

## Notes

- **Don't close the terminals** while using the app
- Backend must be running before frontend
- Model file must exist for predictions to work
- All commands are for local development only (no deployment)

