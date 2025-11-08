import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import api from '../api';

const FeedbackWidget = ({ sessionId }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    try {
      const feedbackData = {
        sessionId,
        rating,
        comment: comment.trim() || undefined,
        feedbackType: rating >= 4 ? 'helpful' : rating <= 2 ? 'not-helpful' : 'general'
      };

      const result = await api.createFeedback(feedbackData);
      
      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          setShowFeedback(false);
          setSubmitted(false);
          setRating(0);
          setComment('');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  if (!sessionId) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      {!showFeedback ? (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Was this helpful?</p>
          <div className="flex gap-2">
            <button
              onClick={() => { setRating(5); setShowFeedback(true); }}
              className="p-2 hover:bg-green-100 rounded-full transition-colors"
              title="Helpful"
            >
              <ThumbsUp className="w-5 h-5 text-green-600" />
            </button>
            <button
              onClick={() => { setRating(2); setShowFeedback(true); }}
              className="p-2 hover:bg-red-100 rounded-full transition-colors"
              title="Not Helpful"
            >
              <ThumbsDown className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      ) : submitted ? (
        <div className="text-center py-2">
          <p className="text-green-600 font-medium">✓ Thank you for your feedback!</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Rate your experience:</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-8 h-8 rounded ${
                    rating >= star ? 'bg-yellow-400' : 'bg-gray-200'
                  } hover:bg-yellow-300 transition-colors`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Additional comments (optional)"
              className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setShowFeedback(false)}
              className="px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackWidget;
