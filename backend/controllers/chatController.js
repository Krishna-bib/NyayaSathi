import ChatSession from "../models/ChatSession.js";
import { v4 as uuidv4 } from "uuid";

// Generate legal advice using Hugging Face API
const generateLegalAdvice = async (userQuery, chatHistory = []) => {
  try {
    const prompt = `
You are NyayaSathi, a specialized AI legal assistant for Indian law ONLY.

⚠️ CRITICAL RESTRICTIONS:
- ONLY answer questions related to Indian law, legal procedures, rights, regulations, and legal matters
- If asked about non-legal topics (cooking, sports, general knowledge, etc.), politely respond:
  "I'm NyayaSathi, a legal assistant specialized in Indian law. I can only help with legal questions and matters related to Indian law. Please ask me about legal rights, procedures, or any law-related queries."
- Do NOT answer questions outside the legal domain
- Stay focused on: Indian laws, legal rights, court procedures, legal documentation, dispute resolution, legal advice

RESPONSE FORMAT (for legal questions only):
1. Start with a brief, clear opening (1-2 sentences)
2. Use clear numbered sections with headings
3. Use bullet points (•) for sub-points under each section
4. Keep each bullet point to ONE line or short sentence
5. Bold important legal terms: **Section 420 IPC**, **Article 21**
6. Add spacing between sections for readability
7. Use minimal emojis (only ⚖️, 📝, ⚠️, ✅ when appropriate)
8. End with disclaimer

MANDATORY STRUCTURE:
[Brief introduction]

**1. [Main Topic/Answer]**
• Clear point
• Another clear point

**2. [Steps/Process if applicable]**
• Step explained simply
• Next step

**3. Important Things to Know:**
• Key point
• Another key point

**⚠️ Disclaimer:** This is general legal information, not legal advice. For your specific situation, please consult a qualified lawyer.

User Question: ${userQuery}

First, check if this is a legal question. If yes, provide a well-structured response. If no, politely decline.
`;

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.HF_MODEL || "deepseek-ai/DeepSeek-V3-0324",
          messages: [
            {
              role: "system",
              content: "You are NyayaSathi, a specialized Indian legal assistant. ONLY answer questions about Indian law, legal procedures, and legal matters. For non-legal questions, politely decline. Always provide well-structured responses with clear sections, numbered points, and bullet points. Use simple language and keep responses concise."
            },
            ...chatHistory.slice(-5).map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 1500,
          temperature: 0.6,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content.trim();
    
    return aiResponse;
  } catch (error) {
    console.error("Error generating legal advice:", error.message);
    
    // Return user-friendly error message
    if (error.message.includes('API error')) {
      throw new Error('Unable to connect to AI service. Please try again.');
    }
    throw new Error('An error occurred while processing your request.');
  }
};

// Create new chat session
export const createNewChat = async (req, res) => {
  try {
    const sessionId = uuidv4();
    const { userId } = req.body;

    const newSession = new ChatSession({
      sessionId,
      userId: userId || null,
      messages: [
        {
          role: "assistant",
          content: "Hi, I'm NyayaSathi. What legal advice do you need?"
        }
      ],
      metadata: {
        userAgent: req.headers["user-agent"],
        ipAddress: req.ip
      }
    });

    await newSession.save();

    res.status(201).json({
      success: true,
      sessionId,
      message: "New chat session created successfully"
    });
  } catch (error) {
    console.error("Error creating new chat:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create new chat session",
      message: error.message
    });
  }
};

// Send message and get AI response
export const sendMessage = async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    if (!sessionId || !message) {
      return res.status(400).json({
        success: false,
        error: "Session ID and message are required"
      });
    }

    // Find chat session
    let chatSession = await ChatSession.findOne({ sessionId });

    if (!chatSession) {
      // Create new session if not found
      chatSession = new ChatSession({
        sessionId,
        messages: [
          {
            role: "assistant",
            content: "Hi, I'm NyayaSathi. What legal advice do you need?"
          }
        ]
      });
    }

    // Add user message
    chatSession.messages.push({
      role: "user",
      content: message
    });

    // Generate AI response
    const aiResponse = await generateLegalAdvice(message, chatSession.messages);

    // Add AI response
    chatSession.messages.push({
      role: "assistant",
      content: aiResponse
    });

    chatSession.updatedAt = new Date();
    await chatSession.save();

    res.status(200).json({
      success: true,
      response: aiResponse,
      sessionId
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process message",
      message: error.message
    });
  }
};

// Get chat history
export const getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const chatSession = await ChatSession.findOne({ sessionId });

    if (!chatSession) {
      return res.status(404).json({
        success: false,
        error: "Chat session not found"
      });
    }

    res.status(200).json({
      success: true,
      messages: chatSession.messages,
      createdAt: chatSession.createdAt
    });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch chat history",
      message: error.message
    });
  }
};

// Get all sessions for a user
export const getUserSessions = async (req, res) => {
  try {
    const { userId } = req.params;

    const sessions = await ChatSession.find({ userId })
      .sort({ updatedAt: -1 })
      .select("sessionId messages createdAt updatedAt")
      .limit(50);

    res.status(200).json({
      success: true,
      count: sessions.length,
      sessions
    });
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch user sessions",
      message: error.message
    });
  }
};

// Delete chat session
export const deleteChat = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const result = await ChatSession.findOneAndDelete({ sessionId });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Chat session not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Chat session deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete chat session",
      message: error.message
    });
  }
};

// Export chat as text
export const exportChatText = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const chatSession = await ChatSession.findOne({ sessionId });

    if (!chatSession) {
      return res.status(404).json({
        success: false,
        error: "Chat session not found"
      });
    }

    const textContent = chatSession.messages
      .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join("\n\n");

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Content-Disposition", `attachment; filename="nyayasathi-chat-${sessionId}.txt"`);
    res.status(200).send(textContent);
  } catch (error) {
    console.error("Error exporting chat:", error);
    res.status(500).json({
      success: false,
      error: "Failed to export chat",
      message: error.message
    });
  }
};
