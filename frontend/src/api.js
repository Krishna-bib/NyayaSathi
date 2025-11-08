// Central API configuration for NyayaSathi Backend
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000', // Backend server URL
  ENDPOINTS: {
    // Chat endpoints
    NEW_CHAT: '/api/chat/new',
    SEND_MESSAGE: '/api/chat/message',
    GET_CHAT_HISTORY: '/api/chat/history',
    GET_USER_SESSIONS: '/api/chat/user',
    DELETE_CHAT: '/api/chat',
    EXPORT_CHAT: '/api/chat/export',
    
    // User endpoints
    CREATE_USER: '/api/users',
    GET_USER: '/api/users',
    UPDATE_USER: '/api/users',
    DELETE_USER: '/api/users',
    GET_ALL_USERS: '/api/users',
    
    // Feedback endpoints
    CREATE_FEEDBACK: '/api/feedback',
    GET_FEEDBACK_BY_SESSION: '/api/feedback/session',
    GET_ALL_FEEDBACK: '/api/feedback',
    DELETE_FEEDBACK: '/api/feedback',
  }
};

// Helper: build full URL for an endpoint
export const apiUrl = (endpoint) => `${API_CONFIG.BASE_URL}${endpoint}`;

// API Helper Functions
export const api = {
  // Chat API calls
  createNewChat: async (userId = null) => {
    const response = await fetch(apiUrl(API_CONFIG.ENDPOINTS.NEW_CHAT), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    return response.json();
  },

  sendMessage: async (sessionId, message) => {
    const response = await fetch(apiUrl(API_CONFIG.ENDPOINTS.SEND_MESSAGE), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, message })
    });
    return response.json();
  },

  getChatHistory: async (sessionId) => {
    const response = await fetch(apiUrl(`${API_CONFIG.ENDPOINTS.GET_CHAT_HISTORY}/${sessionId}`));
    return response.json();
  },

  getUserSessions: async (userId) => {
    const response = await fetch(apiUrl(`${API_CONFIG.ENDPOINTS.GET_USER_SESSIONS}/${userId}`));
    return response.json();
  },

  deleteChat: async (sessionId) => {
    const response = await fetch(apiUrl(`${API_CONFIG.ENDPOINTS.DELETE_CHAT}/${sessionId}`), {
      method: 'DELETE'
    });
    return response.json();
  },

  exportChat: async (sessionId) => {
    const response = await fetch(apiUrl(`${API_CONFIG.ENDPOINTS.EXPORT_CHAT}/${sessionId}`));
    return response.text();
  },

  // User API calls
  createUser: async (userData) => {
    const response = await fetch(apiUrl(API_CONFIG.ENDPOINTS.CREATE_USER), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  getUser: async (userId) => {
    const response = await fetch(apiUrl(`${API_CONFIG.ENDPOINTS.GET_USER}/${userId}`));
    return response.json();
  },

  updateUser: async (userId, userData) => {
    const response = await fetch(apiUrl(`${API_CONFIG.ENDPOINTS.UPDATE_USER}/${userId}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  // Feedback API calls
  createFeedback: async (feedbackData) => {
    const response = await fetch(apiUrl(API_CONFIG.ENDPOINTS.CREATE_FEEDBACK), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackData)
    });
    return response.json();
  },

  getFeedbackBySession: async (sessionId) => {
    const response = await fetch(apiUrl(`${API_CONFIG.ENDPOINTS.GET_FEEDBACK_BY_SESSION}/${sessionId}`));
    return response.json();
  }
};

export default api;
