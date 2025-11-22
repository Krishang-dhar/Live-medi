# Vercel Frontend Deployment Guide

## Quick Steps:

### Option 1: Deploy from GitHub (Recommended)

1. **Go to Vercel Dashboard**: https://vercel.com
2. **Click "Add New Project"**
3. **Import Git Repository**: Select `Live-medi` repository
4. **Configure Project**:
   - **Root Directory**: Set to `web-app` (IMPORTANT!)
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `pnpm install && pnpm run build` (or leave default)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `pnpm install` (or leave default)

5. **Environment Variables**:
   - Click "Environment Variables"
   - Add:
     - **Key**: `RENDER_API_URL`
     - **Value**: `https://diction-api-4pb8.onrender.com`
     - **Environment**: Production, Preview, Development (select all)

6. **Deploy**: Click "Deploy"

### Option 2: Deploy using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to web-app folder
cd web-app

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable
vercel env add RENDER_API_URL
# Enter: https://diction-api-4pb8.onrender.com
# Select: Production, Preview, Development

# Redeploy
vercel --prod
```

## Important Settings:

### Root Directory:
- **MUST be set to**: `web-app`
- This tells Vercel where your Next.js app is located

### Environment Variables:
- `RENDER_API_URL`: `https://diction-api-4pb8.onrender.com`
- This connects frontend to Render backend

### Build Settings:
- Framework: Next.js (auto-detected)
- Build Command: `pnpm install && pnpm run build`
- Output Directory: `.next`

## After Deployment:

1. Your frontend will be live at: `https://your-project.vercel.app`
2. Test the API connection
3. Make predictions!

## Troubleshooting:

### Build Fails?
- Check Root Directory is set to `web-app`
- Verify `package.json` exists in `web-app/`
- Check build logs in Vercel dashboard

### API Not Working?
- Verify `RENDER_API_URL` environment variable is set
- Check Render API is running: `https://diction-api-4pb8.onrender.com/api/health`
- Check browser console for errors

### 404 Errors?
- Make sure Root Directory is `web-app`
- Verify Next.js files are in `web-app/app/` directory

