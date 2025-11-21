# 🚨 FINAL VERCEL SETUP - MUST DO THIS!

## ⚠️ CRITICAL: Root Directory Setting

**This is the #1 reason for 404 errors!**

### Step 1: Vercel Dashboard
1. Go to: https://vercel.com/dashboard
2. Select your project
3. Click **Settings** → **General**

### Step 2: Set Root Directory
```
Root Directory: web-app
```
⚠️ **EXACTLY** `web-app` (not `./web-app` or `/web-app` or blank)

### Step 3: Build Settings (Verify)
```
Framework Preset: Vite (or leave blank)
Build Command: (leave blank - auto)
Output Directory: dist
Install Command: pnpm install
```

### Step 4: Save & Redeploy
1. Click **Save**
2. Go to **Deployments**
3. Click **⋮** → **Redeploy**

## 🔍 After Deploy - Test These URLs:

### 1. Test Simple API (Should work first):
```
https://your-app.vercel.app/api/test
```
Expected: `{"message": "API is working!", "status": "ok", "test": "success"}`

### 2. Test API Health:
```
https://your-app.vercel.app/api/health
```
Expected: `{"status":"healthy","model_loaded":true}`

### 3. Test Frontend:
```
https://your-app.vercel.app/
```
Expected: MediPredict UI should load

## 🐛 If Still 404:

### Check 1: Build Logs
- Deployment → Build Logs
- Look for: "Building..." and "Build completed"
- Any errors?

### Check 2: Functions Tab
- Deployment → Functions
- Should see: `/api/main` and `/api/test`
- If NOT visible → Root Directory is wrong!

### Check 3: File Structure
In GitHub, verify:
```
web-app/
├── api/
│   ├── main.py          ← Must exist
│   ├── test.py          ← Must exist
│   └── requirements.txt ← Must exist
├── src/
├── package.json
└── vercel.json
```

## ✅ Environment Variables (NOT REQUIRED)

You DON'T need environment variables for basic setup. The app uses relative URLs.

If you want to use a different API URL, add in Vercel Dashboard:
- Settings → Environment Variables
- Key: `VITE_API_URL`
- Value: `https://your-app.vercel.app/api`

But this is OPTIONAL - relative URLs should work!

## 🎯 Most Common Issue

**Root Directory NOT set to `web-app`**

If Root Directory is:
- ❌ Blank → Vercel looks in wrong place
- ❌ `./web-app` → Wrong format
- ✅ `web-app` → CORRECT!

## 📸 Verify Settings

Take a screenshot of:
- Settings → General page
- Show: Root Directory field

If it's NOT `web-app`, that's your problem!

