# ⚡ Quick Deploy - 5 Minutes

## 🥇 Best Option: Render.com (Easiest!)

### Why Render?
- ✅ Free tier
- ✅ Auto-detects everything
- ✅ No size limits
- ✅ One-click deploy

---

## 🚀 Deploy in 5 Steps (5 Minutes)

### Step 1: Go to Render
Visit: **https://render.com**
Sign up with **GitHub** (free)

### Step 2: Create Web Service
1. Click **"New +"** button
2. Select **"Web Service"**
3. Connect your GitHub account
4. Select repository: `Krishang-dhar/Disease-Prediction-from-Symptoms`

### Step 3: Configure Settings
**Copy these exact settings:**

```
Name: medi-predict (or any name)
Region: Singapore (or closest to you)
Branch: master
Root Directory: web-app/api
Runtime: Python 3
Build Command: pip install -r requirements.txt
Start Command: python main.py
```

### Step 4: Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add this:
```
Key: PORT
Value: 8000
```

### Step 5: Deploy!
Click **"Create Web Service"**

**Wait 5-10 minutes** → Done! 🎉

---

## 🌐 Get Your URL

After deploy:
- Render will give you a URL like: `https://medi-predict.onrender.com`
- **That's your live API!**

---

## 📱 Frontend Deploy (Optional - Later)

### Option A: Netlify (Easiest for Frontend)

1. Go to **https://netlify.com**
2. Sign up with GitHub
3. **"Add new site"** → **"Import from Git"**
4. Select your repo
5. Settings:
   ```
   Base directory: web-app
   Build command: pnpm build
   Publish directory: dist
   ```
6. **Deploy!**

### Option B: Vercel (If you want)

1. Go to **https://vercel.com**
2. Import project
3. Root Directory: `web-app`
4. Deploy!

---

## ✅ That's It!

**Backend**: `https://your-app.onrender.com`  
**Frontend**: `https://your-app.netlify.app` (if deployed)

---

## 🔗 Connect Frontend to Backend

After both are deployed:

1. **Netlify/Vercel Dashboard** → Your site → **Environment Variables**
2. Add:
   ```
   Key: VITE_API_URL
   Value: https://your-backend.onrender.com
   ```
3. **Redeploy** frontend

---

## ⚡ Quick Summary

**Backend (Render):**
- Root: `web-app/api`
- Build: `pip install -r requirements.txt`
- Start: `python main.py`

**Frontend (Netlify):**
- Root: `web-app`
- Build: `pnpm build`
- Publish: `dist`

**Total Time: 10 minutes!** ⏱️

---

## 🆘 If Something Fails

1. **Check logs** in Render dashboard
2. **Verify** Root Directory is `web-app/api`
3. **Make sure** model file exists in repo
4. **Wait** 5-10 minutes for first deploy

---

## 💡 Pro Tip

**Render is FREE** and handles everything automatically!
No complex config needed - just follow the 5 steps above.

**Start here:** https://render.com → Sign up → Deploy! 🚀

