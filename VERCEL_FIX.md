# 🔧 Vercel 404 Error - Complete Fix Guide

## ✅ What I Just Fixed

1. **Simplified vercel.json** - Removed `builds` config, let Vercel auto-detect
2. **API handler** - Mangum adapter properly configured
3. **Routing** - Rewrites configured correctly

## 🚨 IMPORTANT: Vercel Dashboard Settings

You **MUST** configure these in Vercel Dashboard:

### Step 1: Go to Project Settings
1. Open your project on Vercel
2. Click **Settings** → **General**

### Step 2: Configure Root Directory
- **Root Directory**: `web-app` ⚠️ (This is CRITICAL!)

### Step 3: Build & Development Settings
- **Framework Preset**: `Vite` (or leave blank for auto-detect)
- **Build Command**: `pnpm run vercel-build` (or leave blank)
- **Output Directory**: `dist`
- **Install Command**: `pnpm install`

### Step 4: Save and Redeploy
1. Click **Save**
2. Go to **Deployments**
3. Click **Redeploy** on latest deployment
4. Or push a new commit to trigger auto-deploy

## 📁 File Structure (After Root Directory = web-app)

```
web-app/                    ← Vercel works from here
├── api/
│   └── main.py            ← Becomes /api/main
├── dist/                  ← Build output
├── src/
├── package.json
└── vercel.json
```

## 🔍 Troubleshooting

### If still getting 404:

1. **Check Build Logs**:
   - Go to Deployment → Build Logs
   - Verify both frontend and API are building
   - Look for errors

2. **Check Function Logs**:
   - Go to Deployment → Functions
   - Click on `/api/main`
   - Check for runtime errors

3. **Verify API File**:
   - Make sure `api/main.py` exists
   - Make sure `handler` is exported
   - Check `requirements.txt` has `mangum`

4. **Test API Directly**:
   - Visit: `https://your-app.vercel.app/api/health`
   - Should return: `{"status":"healthy","model_loaded":true}`

5. **Check Model Files**:
   - Verify `saved_model/random_forest.joblib` is in repo
   - Check file size (should be committed to git)

## 🎯 Quick Test

After redeploy, test these URLs:

1. **Frontend**: `https://your-app.vercel.app/`
   - Should show MediPredict UI

2. **API Health**: `https://your-app.vercel.app/api/health`
   - Should return JSON

3. **API Docs**: `https://your-app.vercel.app/api/docs`
   - Should show FastAPI docs

## 💡 Alternative: Deploy Frontend Only (If API Still Fails)

If API keeps failing, you can:
1. Deploy frontend to Vercel (static site)
2. Deploy API separately to:
   - Railway.app
   - Render.com
   - Fly.io
3. Update frontend API URL in `src/App.jsx`

Let me know if you need help with this!

