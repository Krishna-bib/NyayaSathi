# Quick Deployment Commands

## Initial Setup (One Time)

### 1. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
cd ..
```

### 2. Create Environment Files

**Backend (.env):**
```bash
cd backend
cp .env.example .env
# Edit .env with your actual values
```

**Frontend (.env):**
```bash
cd frontend
cp .env.example .env
# Edit .env with your actual values
cd ..
```

### 3. Test Locally

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Visit: http://localhost:5173

---

## Deployment Commands

### Deploy to GitHub
```bash
git add .
git commit -m "Production ready deployment"
git push origin main
```

### Render Backend
1. Connect repo at: https://dashboard.render.com/
2. Auto-deploys on git push

### Vercel Frontend
1. Connect repo at: https://vercel.com/new
2. Auto-deploys on git push

---

## Update After First Deployment

### Update Backend CORS
1. Get your Vercel URL: `https://your-app.vercel.app`
2. Update in Render: Environment → FRONTEND_URL
3. Save (auto-redeploys)

### Update Frontend API URL
1. Get your Render URL: `https://your-app.onrender.com`
2. Update in Vercel: Settings → Environment Variables → VITE_API_URL
3. Save and redeploy

---

## Quick Test URLs

After deployment, test these:

**Backend Health:**
- https://your-backend.onrender.com/
- https://your-backend.onrender.com/api/health

**Frontend:**
- https://your-frontend.vercel.app/

---

## Troubleshooting

### Backend not responding
```bash
# Check Render logs
# Verify environment variables
# Check MongoDB connection
```

### Frontend API errors
```bash
# Check browser console (F12)
# Verify VITE_API_URL is correct
# Check CORS settings in backend
```

### Database errors
```bash
# Verify MongoDB Atlas is running
# Check IP whitelist (0.0.0.0/0)
# Test connection string locally
```

---

## Daily Development Workflow

1. Make changes locally
2. Test with `npm run dev`
3. Commit: `git add . && git commit -m "Your message"`
4. Push: `git push origin main`
5. Auto-deploys to Render & Vercel
6. Verify at production URLs

---

## Emergency Rollback

### Vercel
- Dashboard → Deployments → Click previous deployment → "Promote to Production"

### Render
- Dashboard → Your Service → Manual Deploy → Select previous commit

---

Need help? Check DEPLOYMENT_GUIDE.md for detailed instructions!
