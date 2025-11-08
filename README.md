# NyayaSathi 🏛️⚖️

**India's First Legal AI Chatbot** - Empowering common people with accessible legal information

NyayaSathi is an AI-powered legal assistant that helps users understand Indian law, legal procedures, and their rights through an intuitive chat interface.

## 🌟 Features

- **AI-Powered Legal Advice** - Get instant responses to legal queries using advanced AI
- **Indian Law Expertise** - Specialized in Indian legal system, acts, and procedures
- **User-Friendly Interface** - Clean, responsive design built with React and Tailwind CSS
- **Chat History** - Save and retrieve previous conversations
- **Export Functionality** - Download chat conversations
- **Feedback System** - Rate and provide feedback on responses
- **Multi-Domain Coverage** - Civil, Criminal, Corporate, Family Law, and more

## 📁 Project Structure

```
NyayaSathi/
├── frontend/           # React + Vite frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── api.js     # API configuration
│   │   └── ...
│   └── package.json
│
└── backend/           # Node.js + Express backend
    ├── config/        # Database configuration
    ├── controllers/   # Business logic
    ├── models/        # MongoDB schemas
    ├── routes/        # API routes
    ├── server.js      # Main server file
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Hugging Face API token

### 1. Clone the Repository

```bash
git clone https://github.com/Kusha-RH/NyayaSathi.git
cd NyayaSathi
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file and add your credentials:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
HF_TOKEN=your_hugging_face_token
HF_MODEL=deepseek-ai/DeepSeek-V3-0324
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔑 Getting API Keys

### MongoDB
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Add it to `backend/.env` as `MONGODB_URI`

### Hugging Face
1. Sign up at [Hugging Face](https://huggingface.co/)
2. Go to Settings → Access Tokens
3. Create a new token
4. Add it to `backend/.env` as `HF_TOKEN`

## 📡 API Endpoints

### Chat Routes
- `POST /api/chat/new` - Create new chat session
- `POST /api/chat/message` - Send message and get AI response
- `GET /api/chat/history/:sessionId` - Get chat history
- `GET /api/chat/export/:sessionId` - Export chat as text
- `DELETE /api/chat/:sessionId` - Delete chat session

### User Routes
- `POST /api/users` - Create new user
- `GET /api/users/:userId` - Get user by ID
- `PUT /api/users/:userId` - Update user
- `DELETE /api/users/:userId` - Delete user

### Feedback Routes
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback/session/:sessionId` - Get feedback by session
- `GET /api/feedback` - Get all feedback

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Hugging Face API (DeepSeek model)

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_uri
HF_TOKEN=your_hugging_face_token
HF_MODEL=deepseek-ai/DeepSeek-V3-0324
FRONTEND_URL=http://localhost:5173
```

## 🎯 Features in Detail

### AI Legal Assistant
- Powered by DeepSeek V3 model via Hugging Face
- Context-aware responses
- Maintains conversation history
- Provides citations to relevant Indian laws

### Areas of Law Covered
- Civil Law
- Criminal Law
- Corporate Law
- Family Law
- Property Law
- Labour Law
- Consumer Protection
- Cyber Law
- Tax Law
- Intellectual Property
- And more...

## 🔒 Disclaimer

NyayaSathi is an AI-driven platform designed to provide general legal information. The responses generated do not constitute legal advice and are not a substitute for professional legal consultation. For specific legal matters, please consult a qualified lawyer.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👥 Credits

- Conceptualized by Adv (Dr.) Vibhuti Bhushan Sharma
- Developed and maintained independently by Brainwave Technologies

## 📧 Contact

For queries and support, please contact through the repository issues.

---

Made with ❤️ for accessible legal education in India
