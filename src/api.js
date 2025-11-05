// Central API configuration and placeholders for endpoints
export const API_CONFIG = {
  BASE_URL: '', // e.g., 'https://api.nyayguru.com' or set via env
  ENDPOINTS: {
    SEND_MESSAGE: '/api/chat/message', // POST
    UPLOAD_PDF: '/api/chat/upload', // POST (multipart/form-data)
    DOWNLOAD_CHAT_TXT: '/api/chat/download/txt', // GET
    DOWNLOAD_CHAT_PDF: '/api/chat/download/pdf', // GET
    NEW_CHAT: '/api/chat/new', // POST
    GET_CHAT_HISTORY: '/api/chat/history', // GET
  }
};

// Helper: build full URL for an endpoint
export const apiUrl = (endpoint) => `${API_CONFIG.BASE_URL}${endpoint}`;

// NOTE: Replace BASE_URL with your backend URL or wire it to import.meta.env.VITE_API_BASE_URL
