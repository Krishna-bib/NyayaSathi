import React, { useState, useRef, useEffect } from 'react';
import { Plus, Upload, Download, Maximize2, ChevronUp } from 'lucide-react';
import api from '../api';
import FeedbackWidget from './FeedbackWidget';
import { FormattedMessage } from '../utils/formatMessage.jsx';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi, I'm NyayaSathi. What legal advice do you need?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSessionId, setChatSessionId] = useState(null);
  const messagesContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = (behavior = 'smooth') => {
    const c = messagesContainerRef.current;
    if (c) {
      c.scrollTo({ top: c.scrollHeight, behavior });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize new chat session on component mount
  useEffect(() => {
    initializeChat();
  }, []);

  // Initialize new chat session
  const initializeChat = async () => {
    try {
      const data = await api.createNewChat();
      if (data.success) {
        setChatSessionId(data.sessionId);
        console.log('Chat session initialized:', data.sessionId);
      }
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  };

  // Send message to backend
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const data = await api.sendMessage(chatSessionId, userMessage);
      
      if (data.success) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.response 
        }]);
        // Update session ID if it was created during message send
        if (data.sessionId && !chatSessionId) {
          setChatSessionId(data.sessionId);
        }
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, there was an error processing your request. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle PDF upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    try {
      // TODO: integrate UPLOAD_PDF
      // const formData = new FormData();
      // formData.append('file', file);
      // if (chatSessionId) formData.append('sessionId', chatSessionId);
      // const response = await fetch(apiUrl(API_CONFIG.ENDPOINTS.UPLOAD_PDF), {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();
      // setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);

      console.log('TODO: Upload PDF file:', file.name);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `PDF "${file.name}" received. Please integrate the upload API endpoint.` 
      }]);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };

  // Download chat as TXT from backend
  const handleDownloadTXT = async () => {
    try {
      if (chatSessionId) {
        // Download from backend
        const text = await api.exportChat(chatSessionId);
        const blob = new Blob([text], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nyayasathi-chat-${chatSessionId}.txt`;
        a.click();
      } else {
        // Fallback: client-side download
        const text = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nyayasathi-chat-${Date.now()}.txt`;
        a.click();
      }
    } catch (error) {
      console.error('Error downloading TXT:', error);
      alert('Error downloading chat. Please try again.');
    }
  };

  // Start new chat
  const handleNewChat = () => {
    setMessages([
      { role: 'assistant', content: "Hi, I'm NyayaSathi. What legal advice do you need?" }
    ]);
    initializeChat();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        {/* Chat Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleNewChat}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
              title="New Chat"
            >
              <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
            </button>
            <div>
              <h3 className="text-white font-semibold text-lg">Chat with NyayaSathi</h3>
              <p className="text-indigo-200 text-xs">AI Legal Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleDownloadTXT}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Download Chat"
            >
              <Download className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="bg-gray-50 h-[500px] overflow-y-auto p-6" ref={messagesContainerRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-6 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div
                className={`inline-block px-5 py-4 rounded-lg max-w-2xl shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
                style={{ 
                  textAlign: msg.role === 'assistant' ? 'left' : 'inherit'
                }}
              >
                {msg.role === 'assistant' ? (
                  <FormattedMessage content={msg.content} />
                ) : (
                  <span className="font-medium">{msg.content}</span>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-left mb-6">
              <div className="inline-block px-5 py-4 rounded-lg bg-white shadow-sm border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-200">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              placeholder="Ask your legal question..."
              disabled={isLoading}
              className="w-full px-6 py-4 pr-28 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 text-gray-700 bg-white"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                title="Upload PDF"
              >
                <Upload className="w-5 h-5 text-gray-700" />
              </button>
              <input 
                ref={fileInputRef}
                type="file" 
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-lg bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <ChevronUp className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Widget */}
      {chatSessionId && messages.length > 2 && (
        <FeedbackWidget sessionId={chatSessionId} />
      )}
    </div>
  );
};

export default ChatInterface;
