# Deployment Guide for Vercel

This guide will help you deploy the Disease Prediction Web App to Vercel.

## Prerequisites

1. GitHub account with the repository pushed
2. Vercel account (free tier works fine)
3. All model files in `saved_model/` directory

## Step 1: Push to GitHub

```bash
# Update remote to your repository
git remote set-url origin https://github.com/Krishang-dhar/Disease-Prediction-from-Symptoms.git

# Add all files
git add .

# Commit changes
git commit -m "Add web app and Vercel configuration"

# Push to GitHub
git push -u origin master
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `Krishang-dhar/Disease-Prediction-from-Symptoms`
4. Configure the project:
   - **Root Directory**: `web-app`
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`
5. Add Environment Variables (if needed):
   - None required for this project
6. Click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to web-app directory
cd web-app

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: disease-prediction-web-app
# - Directory: ./
# - Override settings? No
```

## Step 3: Configure Vercel Settings

After initial deployment, you may need to:

1. Go to Project Settings → General
2. Ensure:
   - **Root Directory**: `web-app`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

## Step 4: Verify Deployment

1. Visit your Vercel deployment URL
2. Test the app:
   - Select symptoms
   - Click "Predict Disease"
   - Verify the prediction works

## Important Notes

### Model Files

The model files (`saved_model/*.joblib`) need to be included in the repository for Vercel to access them. Make sure they're committed:

```bash
git add saved_model/*.joblib
git commit -m "Add model files"
git push
```

### API Routes

The API is configured as serverless functions in Vercel:
- API endpoint: `https://your-app.vercel.app/api/predict`
- API docs: `https://your-app.vercel.app/api/docs`

### Troubleshooting

**Model not loading?**
- Check that model files are in the repository
- Verify the path in `api/main.py` matches Vercel's file structure
- Check Vercel build logs for errors

**CORS errors?**
- The API is configured to allow all origins
- If issues persist, check the CORS settings in `api/main.py`

**Build fails?**
- Check that all dependencies are in `package.json`
- Verify Python version compatibility
- Check Vercel build logs

## Alternative: Deploy Backend Separately

If you encounter issues with serverless functions, you can:

1. Deploy frontend to Vercel (static site)
2. Deploy backend to:
   - **Railway**: https://railway.app
   - **Render**: https://render.com
   - **Fly.io**: https://fly.io
3. Update frontend API URL to point to backend URL

## Support

For issues, check:
- Vercel documentation: https://vercel.com/docs
- Vercel Python runtime: https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python

