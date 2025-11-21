# 🚂 Railway Setup - Step by Step

## Step 1: Create/Select Workspace

**Error fix:** "You must specify a workspaceId"

### Solution:
1. Railway dashboard me jao
2. Top left corner me **"New"** button click karein
3. **"Workspace"** select karein (not Project)
4. Workspace name dein (e.g., "My Projects")
5. Create karein

**OR**

1. Left sidebar me **"Workspaces"** click karein
2. Existing workspace select karein
3. Ya **"New Workspace"** create karein

## Step 2: Create Project

Workspace ke andar:
1. **"New"** button click karein
2. **"Project"** select karein
3. **"Deploy from GitHub repo"** click karein
4. Repository select karein: `Krishang-dhar/Disease-Prediction-from-Symptoms`

## Step 3: Configure Project

### Option A: Full Stack (Recommended)
- Root Directory: `web-app`
- Railway auto-detect karega:
  - Frontend (Node.js/Vite)
  - Backend (Python/FastAPI)
- Auto-deploy!

### Option B: Separate Services

**Service 1 - Frontend:**
- Name: `frontend`
- Root Directory: `web-app`
- Build Command: `pnpm install && pnpm build`
- Start Command: `pnpm preview` (or use static site)

**Service 2 - Backend:**
- Name: `backend`
- Root Directory: `web-app/api`
- Start Command: `python main.py`
- Environment Variables:
  - `PORT=8000` (Railway auto-sets PORT)

## Step 4: Environment Variables (Optional)

Backend service me add karein:
- `MODEL_PATH=../saved_model/random_forest.joblib` (if needed)

## Step 5: Deploy

1. Railway automatically deploy start karega
2. Wait for build to complete
3. Get your URLs:
   - Frontend URL
   - Backend URL

## Step 6: Update Frontend (If Separate Services)

Agar backend alag service hai:
1. Backend URL note karein
2. Frontend service me Environment Variable add karein:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend.railway.app`

## 🎯 Quick Fix for Current Error

**"You must specify a workspaceId"** error ka fix:

1. Railway dashboard me jao
2. Left sidebar me **"Workspaces"** click karein
3. Agar workspace nahi hai:
   - **"New Workspace"** click karein
   - Name dein
   - Create karein
4. Workspace select karein
5. Ab **"New Project"** click karein
6. Ab error nahi aayega!

## ✅ Success Checklist

- [ ] Workspace created/selected
- [ ] Project created
- [ ] GitHub repo connected
- [ ] Root Directory set to `web-app`
- [ ] Deploy successful
- [ ] URLs working

## 🐛 Troubleshooting

**Still getting workspace error?**
- Make sure you're logged in
- Try refreshing the page
- Create workspace first, then project

**Build failing?**
- Check build logs
- Verify Root Directory is `web-app`
- Check that all files are in GitHub

**API not working?**
- Check backend service logs
- Verify model files are in repo
- Check environment variables

## 💡 Pro Tip

Railway automatically:
- Detects Python and installs dependencies
- Detects Node.js and runs build
- Creates URLs for each service
- Handles environment variables

Just set Root Directory and deploy! 🚀

