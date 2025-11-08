import React from 'react';

// Format message content to render markdown-like formatting
export const formatMessage = (content) => {
  if (!content) return '';
  
  let formatted = content;
  
  // Convert **bold** to <strong>
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert numbered lists (1., 2., etc.) to proper formatting
  formatted = formatted.replace(/^(\d+\.)\s+(.+)$/gm, '<div class="numbered-item"><strong>$1</strong> $2</div>');
  
  // Convert bullet points (•, -, *) to proper formatting
  formatted = formatted.replace(/^[•\-\*]\s+(.+)$/gm, '<div class="bullet-item">• $1</div>');
  
  // Convert ### Headers to styled headers
  formatted = formatted.replace(/^###\s+(.+)$/gm, '<div class="section-header">$1</div>');
  
  // Convert ** at start of line (for sections) to bold headers
  formatted = formatted.replace(/^\*\*([^*]+)\*\*$/gm, '<div class="bold-header">$1</div>');
  
  // Preserve line breaks
  formatted = formatted.replace(/\n\n/g, '<br><br>');
  formatted = formatted.replace(/\n/g, '<br>');
  
  return formatted;
};

// Component to render formatted message
export const FormattedMessage = ({ content }) => {
  const formattedContent = formatMessage(content);
  
  return (
    <div 
      className="formatted-message"
      dangerouslySetInnerHTML={{ __html: formattedContent }}
      style={{
        lineHeight: '1.6',
      }}
    />
  );
};
