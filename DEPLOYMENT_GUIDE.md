# 🚀 Deployment Guide - NyayaSathi

This guide will help you deploy the NyayaSathi application with the backend on **Render** and the frontend on **Vercel**.

---

## 📋 Prerequisites

Before deployment, ensure you have:
- ✅ MongoDB Atlas account (free tier available)
- ✅ Hugging Face API token
- ✅ GitHub repository pushed
- ✅ Render account (free tier available)
- ✅ Vercel account (free tier available)

---

## 🗄️ Step 1: Set Up MongoDB Atlas

1. **Create MongoDB Cluster:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Click "Connect" → "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/nyayasathi?retryWrites=true&w=majority`)

2. **Configure Network Access:**
   - In MongoDB Atlas, go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0) for Render

3. **Create Database User:**
   - Go to "Database Access"
   - Create a user with password
   - Save credentials securely

---

## 🖥️ Step 2: Deploy Backend on Render

### 2.1 Create New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `Krishna-bib/NyayaSathi`
4. Configure the service:
   - **Name:** `nyayasathi-backend`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### 2.2 Add Environment Variables

Click "Advanced" → "Add Environment Variable" and add:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
HF_TOKEN=your_huggingface_token_here
HF_MODEL=deepseek-ai/DeepSeek-V3-0324
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Important:** 
- Replace `your_mongodb_connection_string_here` with your actual MongoDB Atlas connection string
- Replace `your_huggingface_token_here` with your Hugging Face API token
- You'll update `FRONTEND_URL` after deploying the frontend

### 2.3 Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL: `https://nyayasathi-backend.onrender.com`

**Note:** Render free tier spins down after 15 minutes of inactivity. First request after inactivity may take 30-60 seconds.

---

## 🌐 Step 3: Deploy Frontend on Vercel

### 3.1 Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository: `Krishna-bib/NyayaSathi`
4. Configure project:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 3.2 Add Environment Variables

In the "Environment Variables" section, add:

```
VITE_API_URL=https://nyayasathi-backend.onrender.com
```

**Replace with your actual Render backend URL from Step 2.3**

### 3.3 Deploy

1. Click "Deploy"
2. Wait for deployment (2-3 minutes)
3. Copy your frontend URL: `https://nyayasathi.vercel.app`

---

## 🔄 Step 4: Update Backend CORS

After deploying the frontend, update the backend environment variable on Render:

1. Go to Render Dashboard → Your backend service
2. Go to "Environment" tab
3. Update `FRONTEND_URL` with your actual Vercel URL:
   ```
   FRONTEND_URL=https://nyayasathi.vercel.app
   ```
4. Save changes (service will auto-redeploy)

---

## ✅ Step 5: Test Your Deployment

1. **Backend Health Check:**
   - Visit: `https://nyayasathi-backend.onrender.com/`
   - Should see: `{"message": "NyayaSathi Backend API is running", "status": "active"}`

2. **Frontend:**
   - Visit your Vercel URL
   - Test the chat interface
   - Ask a legal question and verify AI responses

---

## 🔧 Common Issues & Solutions

### Backend Issues

**Problem:** 500 Internal Server Error
- **Solution:** Check Render logs for errors
- Verify MongoDB connection string is correct
- Ensure HF_TOKEN is valid

**Problem:** CORS errors
- **Solution:** Verify FRONTEND_URL in Render environment variables matches your Vercel URL exactly

**Problem:** Slow initial load
- **Solution:** This is normal on Render free tier. Service spins down after 15 min inactivity

### Frontend Issues

**Problem:** API calls fail
- **Solution:** Check VITE_API_URL in Vercel environment variables
- Verify backend is running on Render
- Check browser console for CORS errors

**Problem:** Build fails
- **Solution:** Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify Node version compatibility

---

## 📊 Monitoring & Logs

### Render (Backend)
- Dashboard → Your Service → "Logs" tab
- Real-time logs of API requests and errors

### Vercel (Frontend)
- Dashboard → Your Project → "Deployments" → Click deployment → "View Function Logs"
- Build logs and runtime errors

---

## 🔄 Updating Your Application

### Update Backend
```bash
# Make changes to backend code
git add .
git commit -m "Update backend"
git push origin main
```
Render will auto-deploy on push.

### Update Frontend
```bash
# Make changes to frontend code
git add .
git commit -m "Update frontend"
git push origin main
```
Vercel will auto-deploy on push.

---

## 💰 Cost Considerations

### Free Tier Limits

**Render Free:**
- 750 hours/month
- Spins down after 15 min inactivity
- 512 MB RAM
- Shared CPU

**Vercel Free:**
- 100 GB bandwidth/month
- 6,000 build minutes/month
- Unlimited personal projects

**MongoDB Atlas Free:**
- 512 MB storage
- Shared RAM
- Perfect for development/small apps

---

## 🔐 Security Best Practices

1. **Never commit .env files** - Use environment variables
2. **Rotate API keys** regularly
3. **Monitor MongoDB** access logs
4. **Enable MongoDB IP whitelist** when possible
5. **Use HTTPS only** (both platforms provide this)

---

## 📞 Support Resources

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com/

---

## 🎉 Congratulations!

Your NyayaSathi application is now live!

**Backend:** https://nyayasathi-backend.onrender.com  
**Frontend:** https://nyayasathi.vercel.app

Share your legal AI assistant with the world! 🚀⚖️
