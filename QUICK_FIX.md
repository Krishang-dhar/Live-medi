# Quick Fix for Vercel Deployment

## Problem:
Vercel can't find Next.js because Root Directory is wrong.

## Solution - Two Options:

### Option 1: Fix in Vercel Dashboard (Recommended)

1. **Go to Vercel Project Settings**
   - Open your project: `live-medi`
   - Click **Settings** tab
   - Scroll to **General** section

2. **Change Root Directory**
   - Find **Root Directory** field
   - Click **Edit**
   - Change: `./` → `web-app`
   - Click **Save**

3. **Add Environment Variable**
   - Go to **Environment Variables**
   - Add: `RENDER_API_URL` = `https://disease-prediction-api-4pb8.onrender.com`
   - Select all environments

4. **Redeploy**
   - Go to **Deployments**
   - Click **Redeploy**

### Option 2: Use Correct Repository

If you're using `itskrishangdhar-lab/live-medi`:
- Make sure code is pushed to that repository
- Or change Vercel to use `Krishang-dhar/Live-medi`

## Current Status:
- ✅ Root `vercel.json` created (helps but Root Directory setting is still needed)
- ✅ Code pushed to `Krishang-dhar/Live-medi`
- ⚠️ Vercel using `itskrishangdhar-lab/live-medi` (different repo?)

## Most Important:
**Root Directory MUST be `web-app` in Vercel Settings!**

