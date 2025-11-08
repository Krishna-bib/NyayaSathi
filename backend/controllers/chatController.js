import ChatSession from "../models/ChatSession.js";
import { v4 as uuidv4 } from "uuid";

// Generate legal advice using Hugging Face API
const generateLegalAdvice = async (userQuery, chatHistory = []) => {
  try {
    const prompt = `
You are NyayaSathi, a friendly and expert AI legal assistant specializing in Indian law. 
Your goal is to help common people understand legal matters easily.

RESPONSE FORMAT RULES:
1. Start with a brief, friendly introduction (1-2 lines)
2. Break down information into clear, numbered steps or sections
3. Use simple bullet points (•) for sub-points, not dense paragraphs
4. Highlight important terms in **bold** (like **Section 379 IPC**)
5. Use emojis sparingly for visual breaks (✅, ⚖️, 📝, ⚠️)
6. Keep sentences short and conversational
7. Always end with a helpful closing statement

CONTENT GUIDELINES:
- Explain legal concepts in everyday language (avoid legal jargon)
- When mentioning laws, briefly explain what they mean
- Provide step-by-step actionable guidance
- Include relevant sections/acts but explain them simply
- Add practical tips where helpful
- Remind users this is general information, not legal advice

STRUCTURE EXAMPLE:
[Friendly opening line]

**Step 1: [Main Action]**
• Sub-point with details
• Another helpful detail

**Step 2: [Next Action]**
• Clear explanation
• What to do next

**Important Points:**
• Key information to remember
• Practical tip

**⚠️ Disclaimer:** This is general legal information. For your specific case, please consult a qualified lawyer.

Now respond to: ${userQuery}

Make your response clear, structured, and easy to understand for anyone.
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
              content: "You are NyayaSathi, a friendly Indian legal assistant. Provide clear, well-structured legal information in simple language. Use bullet points, numbered steps, and bold text for readability. Avoid long paragraphs."
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
          max_tokens: 2000,
          temperature: 0.7,
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
    throw error;
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
