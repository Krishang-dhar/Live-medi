# Quick Start Guide

Get your Disease Prediction Web App running in 3 simple steps!

## Step 1: Install Dependencies

### Frontend (React)
```bash
cd web-app
pnpm install
```

### Backend (Python API)
```bash
cd web-app/api
pip install -r requirements.txt
```

## Step 2: Start the Backend

Open a terminal and run:
```bash
cd web-app/api
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

The API will be available at `http://localhost:8000`
- API docs: `http://localhost:8000/docs`

## Step 3: Start the Frontend

Open another terminal and run:
```bash
cd web-app
pnpm dev
```

The app will automatically open in your browser at `http://localhost:3000`

## Alternative: Use the Start Script

You can also use the provided script to start both servers:
```bash
cd web-app
./start.sh
```

## That's it! 🎉

Your web app is now running. You can:
- Search for symptoms
- Select multiple symptoms
- Click "Predict Disease" to get a prediction
- View the result in a beautiful card

## Troubleshooting

**Model not found error?**
- Make sure you've trained the models first by running `train_all_models.py` in the parent directory
- The model should be at `../saved_model/random_forest.joblib`

**Port already in use?**
- Backend: Change port in `api/main.py` (line with `uvicorn.run`)
- Frontend: Change port in `vite.config.js`

**Dependencies not installing?**
- Make sure you have Node.js 18+ and Python 3.8+
- For pnpm: `npm install -g pnpm`

