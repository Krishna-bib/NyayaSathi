import React from 'react';

// Format message content to render markdown-like formatting
export const formatMessage = (content) => {
  if (!content) return '';
  
  let formatted = content;
  
  // First, split by double line breaks to preserve sections
  const sections = formatted.split('\n\n');
  
  formatted = sections.map(section => {
    let sectionFormatted = section;
    
    // Convert **bold text** to <strong> (handle multi-line bold)
    sectionFormatted = sectionFormatted.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>');
    
    // Convert numbered section headers like "**1. Title:**" or "**1. Title**"
    sectionFormatted = sectionFormatted.replace(/^(\d+)\.\s*(.+?)$/gm, 
      '<div class="section-header mt-4 mb-2"><strong class="text-lg font-bold text-gray-900">$1. $2</strong></div>');
    
    // Convert bullet points (•, -, *) at start of line
    sectionFormatted = sectionFormatted.replace(/^[•\-\*]\s+(.+)$/gm, 
      '<div class="bullet-item ml-4 my-1 flex items-start"><span class="mr-2">•</span><span class="flex-1">$1</span></div>');
    
    // Convert ### Headers
    sectionFormatted = sectionFormatted.replace(/^###\s+(.+)$/gm, 
      '<div class="section-header mt-3 mb-2 text-lg font-bold text-gray-900">$1</div>');
    
    // Handle single line breaks within sections
    sectionFormatted = sectionFormatted.replace(/\n/g, '<br>');
    
    return sectionFormatted;
  }).join('<div class="section-break my-4"></div>');
  
  return formatted;
};

// Component to render formatted message
export const FormattedMessage = ({ content }) => {
  const formattedContent = formatMessage(content);
  
  return (
    <div 
      className="formatted-message text-gray-800"
      dangerouslySetInnerHTML={{ __html: formattedContent }}
      style={{
        lineHeight: '1.8',
        fontSize: '0.95rem',
      }}
    />
  );
};
