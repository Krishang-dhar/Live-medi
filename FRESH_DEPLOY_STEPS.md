# 🚀 Fresh Vercel Deployment - Step by Step

## Step 1: Vercel Dashboard me Project Create Karein

1. **Vercel.com** par jao: https://vercel.com
2. **Sign in** karein (GitHub se)
3. **"Add New Project"** button click karein
4. **GitHub repository select karein**: `Krishang-dhar/Disease-Prediction-from-Symptoms`
5. **"Import"** button click karein

## Step 2: Project Settings Configure Karein (⚠️ VERY IMPORTANT!)

### Root Directory Setting:
```
Root Directory: web-app
```
⚠️ **YE BAHUT IMPORTANT HAI!** 
- ❌ Blank mat chhodo
- ❌ `./web-app` mat likho
- ✅ **EXACTLY** `web-app` likho

### Build Settings:
```
Framework Preset: Vite
Build Command: (blank chhodo - auto detect hoga)
Output Directory: dist
Install Command: pnpm install
```

## Step 3: Environment Variables (OPTIONAL - Skip kar sakte ho)

**Abhi ke liye environment variables ki zarurat NAHI hai!**
- Skip karein
- Baad me add kar sakte ho agar chahiye

## Step 4: Deploy Button Click Karein

1. **"Deploy"** button click karein
2. Build start hoga
3. 2-3 minutes wait karein

## Step 5: Build Complete Hone Ke Baad

### Check Build Logs:
- Deployment page par jao
- Build logs check karein
- Koi error hai to dekh lo

### Test URLs:
Deploy ke baad yeh test karein:

1. **Simple API Test:**
   ```
   https://your-app.vercel.app/api/test
   ```
   Expected: `{"message": "API is working!", "status": "ok", "test": "success"}`

2. **API Health:**
   ```
   https://your-app.vercel.app/api/health
   ```
   Expected: `{"status":"healthy","model_loaded":true}`

3. **Frontend:**
   ```
   https://your-app.vercel.app/
   ```
   Expected: MediPredict UI should load

## Step 6: Agar 404 Aaye To

### Check 1: Root Directory
- Settings → General → Root Directory
- **EXACTLY** `web-app` hona chahiye
- Agar galat hai → fix karein → Save → Redeploy

### Check 2: Functions Tab
- Deployment → Functions tab
- `/api/main` aur `/api/test` dikhna chahiye
- Agar nahi dikh raha → Root Directory galat hai

### Check 3: Build Logs
- Build successful hai?
- Koi error hai?

## ✅ Success Checklist

- [ ] Root Directory = `web-app` (exactly)
- [ ] Build successful
- [ ] `/api/test` kaam kar raha hai
- [ ] Frontend load ho raha hai

## 🎯 Quick Summary

1. **New Project** create karein
2. **Root Directory = `web-app`** set karein (MOST IMPORTANT!)
3. **Deploy** karein
4. **Test** karein: `/api/test`

**Root Directory setting sabse important hai!** Agar yeh galat hai, to sab fail hoga.

