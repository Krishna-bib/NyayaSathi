# 🔧 Production Configuration Checklist

## Before Deployment

### 1. Environment Variables Setup

#### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
HF_TOKEN=your_huggingface_api_token
HF_MODEL=deepseek-ai/DeepSeek-V3-0324
FRONTEND_URL=https://your-vercel-url.vercel.app
```

#### Frontend (.env)
```env
VITE_API_URL=https://your-render-backend.onrender.com
```

### 2. MongoDB Atlas Setup
- [ ] Create MongoDB Atlas cluster
- [ ] Create database user with password
- [ ] Whitelist IP: 0.0.0.0/0 (for Render)
- [ ] Get connection string
- [ ] Test connection locally

### 3. Hugging Face Setup
- [ ] Create Hugging Face account
- [ ] Generate API token
- [ ] Test token with API calls
- [ ] Note rate limits

### 4. GitHub Repository
- [ ] Push all code to GitHub
- [ ] Verify .gitignore excludes .env files
- [ ] Include .env.example files
- [ ] Update README with deployment URLs

---

## Render Deployment Checklist

### Backend Service
- [ ] Connected GitHub repository
- [ ] Set root directory to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] All environment variables added
- [ ] Service deployed successfully
- [ ] Health check endpoint working
- [ ] Copy backend URL for frontend

### Post-Deployment
- [ ] Test API endpoints
- [ ] Check logs for errors
- [ ] Verify MongoDB connection
- [ ] Test AI chat functionality

---

## Vercel Deployment Checklist

### Frontend Service
- [ ] Connected GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Framework preset: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] VITE_API_URL environment variable set
- [ ] Service deployed successfully
- [ ] Copy frontend URL for backend CORS

### Post-Deployment
- [ ] Update backend FRONTEND_URL
- [ ] Test website loads correctly
- [ ] Test chat interface
- [ ] Verify API calls work
- [ ] Check responsive design
- [ ] Test on mobile devices

---

## Final Verification

### Functionality Tests
- [ ] Create new chat session
- [ ] Send legal question
- [ ] Receive AI response
- [ ] View chat history
- [ ] Test feedback widget
- [ ] Export chat functionality
- [ ] Test on different browsers

### Performance Tests
- [ ] Initial load time < 3s
- [ ] API response time acceptable
- [ ] No console errors
- [ ] Images/assets load correctly

### Security Tests
- [ ] HTTPS enabled (both sites)
- [ ] CORS configured correctly
- [ ] No sensitive data in client code
- [ ] API keys not exposed
- [ ] MongoDB connection secured

---

## Monitoring Setup

### What to Monitor
- [ ] Backend uptime (Render dashboard)
- [ ] API error rates (Render logs)
- [ ] MongoDB usage (Atlas dashboard)
- [ ] Vercel bandwidth usage
- [ ] Build success/failures

### Regular Maintenance
- [ ] Check logs weekly
- [ ] Monitor MongoDB storage
- [ ] Review API usage
- [ ] Update dependencies monthly
- [ ] Backup MongoDB data

---

## Rollback Plan

If deployment fails:
1. Check Vercel/Render deployment logs
2. Verify environment variables
3. Roll back to previous deployment
4. Test locally first
5. Re-deploy after fixes

---

## Performance Optimization

### Backend (Render)
- [ ] Enable response compression
- [ ] Add request caching if needed
- [ ] Optimize database queries
- [ ] Consider upgrading from free tier

### Frontend (Vercel)
- [ ] Enable Vercel analytics
- [ ] Optimize images
- [ ] Code splitting if needed
- [ ] Enable caching headers

---

## Upgrade Path (Future)

### When to upgrade:
- Traffic exceeds free tier limits
- Need faster response times
- Require always-on backend
- Need more storage/bandwidth

### Paid Tier Benefits:
**Render:**
- No cold starts
- More RAM/CPU
- Custom domains
- $7/month starter tier

**Vercel:**
- More bandwidth
- Team collaboration
- Custom domains
- $20/month pro tier

**MongoDB Atlas:**
- More storage
- Better performance
- Backups
- $9/month starter tier

---

## Support & Resources

### Documentation
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Vite Docs](https://vitejs.dev/)

### Community
- Render Community Forum
- Vercel Discord
- MongoDB Community Forums
- Stack Overflow

---

## 🎉 Deployment Complete!

Once all checkboxes are checked, your application is production-ready!

**Remember:** 
- Keep environment variables secure
- Monitor your applications regularly
- Update dependencies for security
- Backup your database regularly

Good luck with your deployment! 🚀
