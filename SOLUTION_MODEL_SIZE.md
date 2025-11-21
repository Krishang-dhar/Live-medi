# 🚨 Model Files Too Large for Vercel - Solution

## Problem
Vercel serverless functions have a 250 MB limit. Model files (`.joblib`) are too large and exceed this limit.

## Solution Options

### Option 1: Deploy Backend Separately (RECOMMENDED)

**Deploy API to Railway/Render/Fly.io:**

1. **Railway** (Easiest):
   - Go to: https://railway.app
   - New Project → Deploy from GitHub
   - Select repository
   - Root Directory: `web-app/api`
   - It will auto-detect Python
   - Add environment variable: `MODEL_PATH=../saved_model/random_forest.joblib`
   - Deploy!

2. **Render**:
   - Go to: https://render.com
   - New Web Service
   - Connect GitHub repo
   - Build Command: `pip install -r web-app/api/requirements.txt`
   - Start Command: `cd web-app/api && python main.py`

3. **Update Frontend API URL:**
   - In `web-app/src/App.jsx`
   - Change API URL to your Railway/Render URL

### Option 2: Use External Storage (Advanced)

Store models in:
- AWS S3
- Google Cloud Storage
- Cloudflare R2
- Download at runtime

### Option 3: Use Smaller Model

Train a smaller model or use model compression.

## Quick Fix: Railway Deployment

1. **Deploy API to Railway:**
   ```bash
   # Railway will auto-detect Python
   # Just point to web-app/api folder
   ```

2. **Get Railway URL:**
   - Example: `https://your-api.railway.app`

3. **Update Frontend:**
   - Change API calls to Railway URL
   - Or use environment variable

## Recommended: Railway Setup

Railway is easiest for Python APIs with large files:

1. Sign up: https://railway.app
2. New Project → GitHub
3. Select repo
4. Settings → Root Directory: `web-app/api`
5. Deploy!

Then update frontend to use Railway URL.

