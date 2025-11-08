# NyayaSathi Backend Server

Backend API server for NyayaSathi - India's First Legal AI Chatbot

## 🚀 Features

- **AI-Powered Legal Assistance** - Using Hugging Face API for intelligent legal responses
- **MongoDB Database** - Persistent storage for chat sessions, users, and feedback
- **RESTful API** - Clean and organized API endpoints
- **Session Management** - Track and manage user chat sessions
- **User Management** - CRUD operations for user data
- **Feedback System** - Collect and analyze user feedback
- **Chat History** - Store and retrieve conversation history
- **Export Functionality** - Export chats as text files

## 📦 Installation

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Add your MongoDB connection string
   - Add your Hugging Face API token

   ```env
   MONGODB_URI=your_mongodb_connection_string
   HF_TOKEN=your_hugging_face_token
   ```

3. **Start the Server**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

## 🔌 API Endpoints

### Chat Routes (`/api/chat`)
- `POST /new` - Create new chat session
- `POST /message` - Send message and get AI response
- `GET /history/:sessionId` - Get chat history
- `GET /user/:userId` - Get all sessions for a user
- `DELETE /:sessionId` - Delete chat session
- `GET /export/:sessionId` - Export chat as text

### User Routes (`/api/users`)
- `POST /` - Create new user
- `GET /` - Get all users (admin)
- `GET /:userId` - Get user by ID
- `PUT /:userId` - Update user
- `DELETE /:userId` - Delete user

### Feedback Routes (`/api/feedback`)
- `POST /` - Submit feedback
- `GET /session/:sessionId` - Get feedback by session
- `GET /` - Get all feedback (admin)
- `DELETE /:feedbackId` - Delete feedback

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── chatController.js    # Chat logic & AI integration
│   ├── userController.js    # User management
│   └── feedbackController.js # Feedback handling
├── models/
│   ├── ChatSession.js       # Chat session schema
│   ├── User.js              # User schema
│   └── Feedback.js          # Feedback schema
├── routes/
│   ├── chatRoutes.js        # Chat endpoints
│   ├── userRoutes.js        # User endpoints
│   └── feedbackRoutes.js    # Feedback endpoints
├── .env                     # Environment variables (add your keys)
├── .env.example             # Environment template
├── server.js                # Main server file
└── package.json             # Dependencies
```

## 🤖 AI Integration

The backend uses Hugging Face's DeepSeek model for generating legal responses. The AI is configured to:
- Provide accurate Indian legal information
- Explain concepts in simple language
- Cite relevant laws and sections
- Remind users this is general information
- Suggest professional consultation for specific matters

## 🔒 Environment Variables

Required variables in `.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_uri
HF_TOKEN=your_hugging_face_token
HF_MODEL=deepseek-ai/DeepSeek-V3-0324
FRONTEND_URL=http://localhost:5173
```

## 📊 Database Models

### ChatSession
- Session ID (unique)
- User ID (optional)
- Messages array (role, content, timestamp)
- Metadata (user agent, IP)
- Timestamps

### User
- Name, email, phone (optional)
- Anonymous flag
- Chat history references
- Preferences
- Activity timestamps

### Feedback
- Session reference
- Rating (1-5)
- Comment
- Feedback type
- Timestamp

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run in development mode (auto-reload)
npm run dev

# Run in production mode
npm start
```

## 📝 Notes

- The server runs on port 5000 by default
- CORS is configured for frontend communication
- All API responses follow a consistent format
- Error handling middleware is included
- MongoDB connection is required for full functionality
- Hugging Face API token is required for AI responses

## 🤝 Contributing

Feel free to contribute to improve NyayaSathi backend!

---

Made with ❤️ for NyayaSathi - Legal AI for Everyone
