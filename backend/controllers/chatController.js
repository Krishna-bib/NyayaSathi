import ChatSession from "../models/ChatSession.js";
import { v4 as uuidv4 } from "uuid";

// Generate legal advice using Hugging Face API
const generateLegalAdvice = async (userQuery, chatHistory = []) => {
  try {
    const prompt = `
You are NyayaSathi, a specialized AI legal assistant EXCLUSIVELY for Indian law.

⚠️ STRICT RESTRICTIONS:
- ONLY answer questions about Indian law, Indian legal procedures, Indian Constitution, Indian courts, and Indian legal matters
- Questions about laws of other countries (US law, UK law, etc.) must be declined
- If asked about non-legal topics OR non-Indian legal topics, respond:
  "I'm NyayaSathi, specialized in Indian law only. I can help with questions about Indian legal rights, Indian court procedures, Indian Constitution, IPC, CrPC, CPC, and other Indian laws. Please ask about Indian legal matters."
- Focus EXCLUSIVELY on: Indian Constitution, IPC, CrPC, CPC, Indian Supreme Court, High Courts, Indian legal rights, Indian legal procedures
- Do NOT provide information about international law, foreign legal systems, or general knowledge topics

RESPONSE FORMAT (for Indian legal questions only):
1. Brief opening (1-2 sentences)
2. Numbered sections with clear headings
3. Bullet points (•) for details - keep each point concise
4. Bold key terms: **Section 420 IPC**, **Article 21**, **Right to Equality**
5. Minimal spacing - single line between points
6. Use emojis sparingly: ⚖️, 📝, ⚠️, ✅
7. End with disclaimer

MANDATORY STRUCTURE:
[Brief introduction - 2 lines max]

**1. [Main Answer]**
• Concise point
• Another concise point

**2. [Legal Process/Steps]**
• Clear step
• Next step

**3. Key Points:**
• Important detail
• Another detail

**⚠️ Disclaimer:** General legal information only. Consult a qualified Indian lawyer for specific advice.

User Question: ${userQuery}

Verify this is about Indian law. If yes, provide structured response. If no, politely decline.
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
              content: "You are NyayaSathi, specialized ONLY in Indian law. Answer ONLY questions about Indian legal matters - Indian Constitution, IPC, CrPC, CPC, Indian courts, Indian legal procedures. Decline questions about foreign laws or non-legal topics. Provide well-structured responses with numbered sections and concise bullet points. Keep spacing minimal between points."
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
