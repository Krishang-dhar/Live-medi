# 🚀 Simple Run Instructions

## Option 1: Run Locally (Easiest)

### Step 1: Open Terminal
```bash
cd /Users/krishang/Desktop/saurabh/Disease-Prediction-from-Symptoms/web-app
```

### Step 2: Install Frontend Dependencies
```bash
pnpm install
```

### Step 3: Start Frontend
```bash
pnpm dev
```
Frontend will run on: **http://localhost:3000**

### Step 4: Open New Terminal (Keep first one running)

```bash
cd /Users/krishang/Desktop/saurabh/Disease-Prediction-from-Symptoms/web-app/api
```

### Step 5: Install Python Dependencies
```bash
pip install -r requirements.txt
```

### Step 6: Start Backend
```bash
python main.py
```
Backend will run on: **http://localhost:8000**

### Step 7: Open Browser
Go to: **http://localhost:3000**

✅ **Done!** App is running!

---

## Option 2: Use Start Scripts (Even Easier)

### For Frontend:
```bash
cd /Users/krishang/Desktop/saurabh/Disease-Prediction-from-Symptoms/web-app
./start.sh
```

### For Backend:
```bash
cd /Users/krishang/Desktop/saurabh/Disease-Prediction-from-Symptoms/web-app/api
./start.sh
```

---

## Quick Commands Summary

**Terminal 1 (Frontend):**
```bash
cd web-app
pnpm install
pnpm dev
```

**Terminal 2 (Backend):**
```bash
cd web-app/api
pip install -r requirements.txt
python main.py
```

**Browser:**
```
http://localhost:3000
```

---

## Troubleshooting

**Port already in use?**
- Change port in `vite.config.js` (frontend)
- Change port in `main.py` (backend)

**Dependencies not installing?**
- Frontend: `pnpm install --force`
- Backend: `pip install --upgrade pip` then `pip install -r requirements.txt`

**Model not found?**
- Make sure `saved_model/random_forest.joblib` exists
- Check path in `api/main.py`

---

## That's It! 🎉

Just run these 2 commands in 2 terminals and open browser!

