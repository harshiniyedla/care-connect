# CareConnect Deployment Guide

Follow these steps to deploy your Doctor Booking System to the web.

## 1. Prepare Your Razorpay Keys
1. Go to your [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. Navigate to **Settings > API Keys**.
3. Copy your **Key ID** and **Key Secret**. (Use Live keys for real payments or Test keys for testing).

## 2. Deploy the Backend (API)
We recommend **Render** or **Railway** for the Node.js server.

### Steps for Render:
1. Create a new **Web Service** on Render.
2. Connect your GitHub repository.
3. Set the following:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Go to **Environment Variables** and add:
   - `RAZORPAY_KEY_ID`: Your Razorpay Key ID
   - `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret
   - `PORT`: `3001` (or leave it to Render's default)
5. Copy the URL of your deployed backend (e.g., `https://care-connect-api.onrender.com`).

## 3. Deploy the Frontend (Website)
We recommend **Vercel** or **Netlify**.

### Steps for Vercel:
1. Create a new project on Vercel.
2. Connect your GitHub repository.
3. Set the **Framework Preset** to `Vite`.
4. Set the **Root Directory** if necessary (it should be where `package.json` is).
5. In **Environment Variables**, add:
   - `VITE_API_URL`: The URL of your **Backend** (from Step 2).
6. Click **Deploy**.

## 4. Final Updates
After deployment, ensure that the `API_URL` in `script.js` correctly points to your live backend if you encounter connection issues.

> [!IMPORTANT]
> Since you are using JSON files (`slots.json`, `schedules.json`) for data, these files will reset every time the server restarts on platforms like Render (free tier). For a permanent solution, we recommend connecting a database like MongoDB or PostgreSQL in the future.

## 5. Security Checklist
- [ ] Change `API_URL` in `script.js` to your live backend URL if it's not automatically detected.
- [ ] Ensure your Razorpay dashboard allows your new domain in the **Whitelisted Domains** section.
- [ ] **NEVER** share your `.env` file or commit it to GitHub.
