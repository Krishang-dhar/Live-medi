# 🚀 Quick Vercel Deployment Guide

Your code has been pushed to GitHub! Now let's deploy it to Vercel.

## ✅ Step 1: Code is Already on GitHub

Repository: https://github.com/Krishang-dhar/Disease-Prediction-from-Symptoms.git

## 📋 Step 2: Deploy to Vercel

### Method 1: Via Vercel Dashboard (Recommended)

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with your GitHub account
3. **Click "Add New Project"**
4. **Import your repository**:
   - Search for: `Krishang-dhar/Disease-Prediction-from-Symptoms`
   - Click "Import"
5. **Configure Project Settings**:
   ```
   Root Directory: web-app
   Framework Preset: Vite
   Build Command: pnpm build
   Output Directory: dist
   Install Command: pnpm install
   ```
6. **Click "Deploy"**

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to web-app
cd web-app

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name: disease-prediction-web-app
# - Directory: ./
# - Override settings? No
```

## ⚙️ Step 3: Configure Root Directory (Important!)

After deployment, you **must** configure the root directory:

1. Go to your project on Vercel dashboard
2. Click **Settings** → **General**
3. Under **Root Directory**, set: `web-app`
4. Click **Save**

## 🔍 Step 4: Verify Deployment

1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Test the app:
   - Select symptoms
   - Click "Predict Disease"
   - Verify prediction works

## 📝 Important Notes

### Model Files
- Model files are included in the repository
- They should be accessible at: `../saved_model/random_forest.joblib` from the API

### API Endpoints
- Frontend: `https://your-app.vercel.app`
- API: `https://your-app.vercel.app/api/predict`
- API Docs: `https://your-app.vercel.app/api/docs`

### Troubleshooting

**Build fails?**
- Check Vercel build logs
- Ensure `Root Directory` is set to `web-app`
- Verify all dependencies in `package.json`

**Model not loading?**
- Check that model files are in the repo
- Verify file paths in `api/main.py`
- Check Vercel function logs

**CORS errors?**
- API is configured to allow all origins
- Check browser console for specific errors

## 🎉 You're Done!

Your app should now be live on Vercel! Share the URL with others.

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Python Runtime](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

