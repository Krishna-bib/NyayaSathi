# NyayaSathi - Complete Setup Guide

This guide will help you set up the complete NyayaSathi application (Frontend + Backend).

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Local installation or MongoDB Atlas account
- **Git** - For cloning the repository
- **Code Editor** - VS Code recommended

## 🎯 Step-by-Step Setup

### Step 1: Install Backend Dependencies

Open PowerShell and navigate to the backend directory:

```powershell
cd C:\Users\krish\NyayaSathi\backend
npm install
```

This will install all required packages:
- express
- mongoose
- dotenv
- cors
- body-parser
- multer
- pdf-parse
- uuid

### Step 2: Configure Backend Environment

1. Open the `.env` file in the backend folder
2. Add your credentials:

```env
PORT=5000
NODE_ENV=development

# Add your MongoDB connection string here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nyayasathi?retryWrites=true&w=majority

# Add your Hugging Face token here
HF_TOKEN=hf_your_token_here
HF_MODEL=deepseek-ai/DeepSeek-V3-0324

FRONTEND_URL=http://localhost:5173
```

### Step 3: Get MongoDB Connection String

**Option A: MongoDB Atlas (Cloud - Free)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Log in
3. Create a new project called "NyayaSathi"
4. Click "Build a Database"
5. Choose FREE tier (M0)
6. Select your region (closest to you)
7. Click "Create Cluster"
8. Create a database user:
   - Username: nyayasathi
   - Password: (generate a secure password)
9. Click "Connect" → "Connect your application"
10. Copy the connection string
11. Replace `<password>` with your actual password
12. Paste it in `.env` as `MONGODB_URI`

**Option B: Local MongoDB**

If you have MongoDB installed locally:
```env
MONGODB_URI=mongodb://localhost:27017/nyayasathi
```

### Step 4: Get Hugging Face API Token

1. Go to https://huggingface.co/
2. Sign up / Log in (free account)
3. Click your profile → Settings
4. Go to "Access Tokens"
5. Click "New token"
6. Name it "NyayaSathi"
7. Select "Read" permission
8. Copy the token (starts with `hf_`)
9. Paste it in `.env` as `HF_TOKEN`

### Step 5: Install Frontend Dependencies

Open a **new PowerShell window** and navigate to frontend:

```powershell
cd C:\Users\krish\NyayaSathi\frontend
npm install
```

This will install:
- react
- react-dom
- lucide-react
- vite
- tailwindcss
- postcss
- autoprefixer

### Step 6: Start the Backend Server

In the backend PowerShell window:

```powershell
cd C:\Users\krish\NyayaSathi\backend
npm run dev
```

You should see:
```
🚀 NyayaSathi Backend Server running on port 5000
📡 Environment: development
✅ MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
```

### Step 7: Start the Frontend Server

In the frontend PowerShell window:

```powershell
cd C:\Users\krish\NyayaSathi\frontend
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 8: Access the Application

Open your browser and go to:
```
http://localhost:5173
```

## ✅ Verification Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] MongoDB connected successfully
- [ ] No errors in either terminal
- [ ] Website loads in browser
- [ ] Can type messages in chat interface

## 🧪 Testing the Application

1. **Test Backend API**:
   - Open browser: http://localhost:5000
   - Should see: `{"message": "NyayaSathi Backend API is running",...}`

2. **Test Chat Interface**:
   - Go to http://localhost:5173
   - Type a legal query like: "What are the grounds for divorce in India?"
   - Should receive an AI-generated response

3. **Test MongoDB Connection**:
   - Send a message in the chat
   - Go to MongoDB Atlas → Browse Collections
   - Should see `chatsessions` collection with your message

## 🐛 Troubleshooting

### Backend Issues

**Error: "MONGODB_URI not found"**
- Make sure `.env` file exists in backend folder
- Check that `MONGODB_URI` is set correctly
- No spaces around `=` in `.env` file

**Error: "MongoNetworkError"**
- Check your internet connection
- Verify MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for development)
- Confirm password is correct in connection string

**Error: "Hugging Face API error"**
- Verify `HF_TOKEN` is correct in `.env`
- Check token has not expired
- Ensure token starts with `hf_`

### Frontend Issues

**Error: "npm install" fails**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

**Error: "Cannot connect to backend"**
- Check backend server is running
- Verify `BASE_URL` in `frontend/src/api.js` is `http://localhost:5000`
- Check CORS settings

**Port Already in Use**
- Frontend: `npm run dev -- --port 3000`
- Backend: Change `PORT` in `.env` to another number

## 📦 Production Deployment

### Backend
```powershell
cd backend
npm start
```

### Frontend
```powershell
cd frontend
npm run build
npm run preview
```

## 🔄 Daily Development Workflow

1. Start backend:
   ```powershell
   cd C:\Users\krish\NyayaSathi\backend
   npm run dev
   ```

2. Start frontend (new terminal):
   ```powershell
   cd C:\Users\krish\NyayaSathi\frontend
   npm run dev
   ```

3. Make changes and test
4. Stop servers: `Ctrl + C` in each terminal

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Hugging Face API](https://huggingface.co/docs/api-inference/)
- [Vite Documentation](https://vitejs.dev/)

## 💡 Tips

- Use `nodemon` for auto-restart on backend changes (already configured)
- Vite hot-reloads frontend automatically
- Check browser console for frontend errors
- Check terminal for backend errors
- Use MongoDB Compass for easier database viewing

## 🎉 Success!

If everything is working:
- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:5173
- ✅ MongoDB connected
- ✅ AI responses working
- ✅ Chat messages saved to database

You're ready to develop NyayaSathi! 🚀

---

Need help? Check the main README.md or create an issue on GitHub.
