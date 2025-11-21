# ✅ Vercel Deployment Checklist - MUST DO THESE!

## 🚨 CRITICAL: Vercel Dashboard Settings

### Step 1: Go to Project Settings
1. Open Vercel Dashboard
2. Select your project
3. Click **Settings** → **General**

### Step 2: Verify These Settings EXACTLY:

```
Root Directory: web-app
Framework Preset: Vite (or leave blank)
Build Command: (leave blank - will use vercel-build)
Output Directory: dist
Install Command: pnpm install
```

### Step 3: Save and Redeploy
1. Click **Save**
2. Go to **Deployments** tab
3. Click **⋮** (three dots) on latest deployment
4. Click **Redeploy**
5. Wait for build to complete

## 🔍 After Deployment - Check These:

### 1. Check Build Logs
- Go to Deployment → Build Logs
- Look for:
  - ✅ "Building frontend..."
  - ✅ "Installing dependencies..."
  - ✅ "Build completed successfully"
  - ❌ Any errors?

### 2. Check Functions Tab
- Go to Deployment → Functions
- You should see: `/api/main` listed
- If NOT visible → API not detected

### 3. Test These URLs:

**Frontend:**
```
https://your-app.vercel.app/
```
Should show: MediPredict UI

**API Test (Simple):**
```
https://your-app.vercel.app/api/test
```
Should return: `{"message": "API is working!", "status": "ok"}`

**API Health:**
```
https://your-app.vercel.app/api/health
```
Should return: `{"status":"healthy","model_loaded":true}`

## 🐛 If Still 404:

### Check 1: Root Directory
- Is it EXACTLY `web-app`? (not `./web-app` or `/web-app`)
- Case sensitive!

### Check 2: File Structure
Your repo should have:
```
web-app/
├── api/
│   ├── main.py          ← Must exist
│   ├── test.py          ← Test file
│   └── requirements.txt ← Must exist
├── src/
├── package.json
├── vercel.json
└── dist/                ← Created after build
```

### Check 3: Git Push
- Make sure all files are pushed to GitHub
- Check: `git status` should be clean

### Check 4: Vercel Project Link
- Settings → Git
- Verify it's linked to correct repo
- Verify branch is `master`

## 💡 Quick Test

After redeploy, try:
1. `https://your-app.vercel.app/api/test` - Simple test
2. If this works → API is working, routing issue
3. If this fails → API not detected, check Root Directory

## 📞 Still Not Working?

Share these details:
1. Screenshot of Vercel Settings → General
2. Build logs (last 50 lines)
3. Function logs (if any)
4. Error message you're seeing

