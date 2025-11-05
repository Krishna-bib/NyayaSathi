import React, { useState, useRef, useEffect } from 'react';
import { Menu, Upload, Download, Maximize2, ChevronUp } from 'lucide-react';
import { API_CONFIG, apiUrl } from '../api';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi, I'm NyayGuru. What legal advice do you need?" }
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

  // Initialize new chat session (optional: call on mount or before first send)
  const initializeChat = async () => {
    try {
      // TODO: integrate backend NEW_CHAT endpoint
      // const response = await fetch(apiUrl(API_CONFIG.ENDPOINTS.NEW_CHAT), {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' }
      // });
      // const data = await response.json();
      // setChatSessionId(data.sessionId);
      console.log('TODO: Initialize chat session');
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
      // TODO: integrate SEND_MESSAGE
      // const response = await fetch(apiUrl(API_CONFIG.ENDPOINTS.SEND_MESSAGE), {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: userMessage, sessionId: chatSessionId })
      // });
      // const data = await response.json();
      // setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);

      // Demo response (remove when API is integrated)
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Thank you for your query. Please integrate the API endpoint to connect to the NyayGuru AI backend for detailed legal information.' 
        }]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, there was an error processing your request. Please try again.' 
      }]);
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

  // Download chat as TXT (client-side). Server-side option is in API_CONFIG.
  const handleDownloadTXT = async () => {
    try {
      const text = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');
      const blob = new Blob([text], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nyayguru-chat-${Date.now()}.txt`;
      a.click();
    } catch (error) {
      console.error('Error downloading TXT:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        {/* Chat Header */}
        <div className="px-4 py-3 flex justify-between items-center" style={{ backgroundColor: '#E8C794' }}>
          <button className="p-1.5 hover:bg-black/10 rounded transition-colors">
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleDownloadTXT}
              className="p-1.5 hover:bg-black/10 rounded transition-colors"
              title="Download Chat"
            >
              <Download className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-1.5 hover:bg-black/10 rounded transition-colors" title="Fullscreen">
              <Maximize2 className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="bg-black h-96 overflow-y-auto p-6" ref={messagesContainerRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div
                className={`inline-block px-6 py-3 rounded-2xl max-w-xl ${
                  msg.role === 'user' 
                    ? 'bg-white text-gray-900 rounded-br-sm' 
                    : 'rounded-bl-sm text-gray-900'
                }`}
                style={{ 
                  backgroundColor: msg.role === 'assistant' ? '#E8C794' : undefined 
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-left mb-4">
              <div className="inline-block px-6 py-3 rounded-2xl rounded-bl-sm" style={{ backgroundColor: '#E8C794' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              placeholder="Type your message..."
              disabled={isLoading}
              className="w-full px-4 py-3 pr-24 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 text-gray-700"
              style={{ backgroundColor: '#F5EFE6' }}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: '#A68B5B' }}
                title="Upload PDF"
              >
                <Upload className="w-5 h-5 text-white" />
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
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
                style={{ backgroundColor: '#A68B5B' }}
              >
                <ChevronUp className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
