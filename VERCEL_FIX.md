# Vercel Deployment Fix

## Problem:
```
Error: No Next.js version detected. Make sure your package.json has "next" in either "dependencies" or "devDependencies". Also check your Root Directory setting matches the directory of your package.json file.
```

## Solution:

### Step 1: Go to Vercel Project Settings
1. Open your project in Vercel Dashboard
2. Go to **Settings** tab
3. Scroll to **General** section

### Step 2: Fix Root Directory
1. Find **Root Directory** field
2. Click **Edit** button
3. Change from: `./` 
4. Change to: `web-app`
5. Click **Save**

### Step 3: Verify Framework
1. In **General** settings, check **Framework Preset**
2. Should be: **Next.js**
3. If not, select **Next.js** from dropdown

### Step 4: Add Environment Variable
1. Go to **Environment Variables** section
2. Click **Add New**
3. Add:
   - **Key**: `RENDER_API_URL`
   - **Value**: `https://disease-prediction-api-4pb8.onrender.com`
   - **Environments**: Select all (Production, Preview, Development)
4. Click **Save**

### Step 5: Redeploy
1. Go to **Deployments** tab
2. Click **Redeploy** on latest deployment
3. Or trigger new deployment from GitHub

## Quick Fix Checklist:
- ✅ Root Directory = `web-app` (NOT `./`)
- ✅ Framework = Next.js
- ✅ Environment Variable = `RENDER_API_URL`
- ✅ Redeploy

## Why This Happens:
- Vercel looks for `package.json` in Root Directory
- Your `package.json` is in `web-app/` folder
- If Root Directory is `./`, Vercel looks in root, not in `web-app/`
- Setting Root Directory to `web-app` tells Vercel where to find Next.js

