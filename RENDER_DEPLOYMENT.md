# Render Deployment Guide

## Quick Setup

1. **Connect Repository**: Link your GitHub repo `https://github.com/Krishang-dhar/Live-medi.git` to Render

2. **Create Web Service**:
   - **Name**: `disease-prediction-api`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r web-app/api/requirements.txt`
   - **Start Command**: `cd web-app/api && python main.py`
   - **Python Version**: `3.11.0` (set in Environment Variables)

3. **Environment Variables** (Optional):
   - `PORT`: Auto-set by Render (default: 8000)
   - `PYTHON_VERSION`: `3.11.0`

4. **Important**: Make sure `saved_model/random_forest.joblib` exists in the repository root

## File Structure for Render

```
Live-medi/
├── web-app/
│   └── api/
│       ├── main.py          # FastAPI app
│       ├── requirements.txt # Python deps (Render-compatible)
│       └── runtime.txt      # Python version
├── saved_model/
│   └── random_forest.joblib # ML model (must exist)
└── render.yaml              # Render config (optional)
```

## Troubleshooting

### Build Fails with Rust Error?
- ✅ Fixed: Updated `requirements.txt` to use newer versions with pre-built wheels
- All packages now install without Rust compilation

### Model Not Found?
- Ensure `saved_model/random_forest.joblib` is committed to Git
- Check file path in `web-app/api/main.py`

### Port Issues?
- Render automatically sets `PORT` environment variable
- Code updated to use `os.environ.get("PORT", 8000)`

## Notes

- The API will be available at: `https://your-service-name.onrender.com`
- Health check: `https://your-service-name.onrender.com/api/health`
- Prediction endpoint: `https://your-service-name.onrender.com/api/predict`

