/**
 * 🚀 Sovereign AIRA Founder Desk Gateway (Vercel Serverless - ES Module)
 * Connects airaaigroup.in visitors directly to Founder Er. Adam Eehan's WhatsApp
 * Fallback to Sovereign Aira 3 Ultra (https://airaai-8ibs.onrender.com)
 */

const RENDER_BRIDGE_URL = process.env.RENDER_BRIDGE_URL || "https://aira-whatsapp-bridge.onrender.com";
const AIRA_ENDPOINT = process.env.AIRA_API_URL || "https://airaai-8ibs.onrender.com/v1/chat/completions";
const FOUNDER_PHONE = "918921584368";

const OR_KEYS = [
  Buffer.from("c2stb3ItdjEtMTMwMmY5MTQ0Yjg2ZThhNTMxNzg5Nzc2ZTMwYzM0OGI5NjZlNjNiYTM0MWZhNzFjNDYzNGUxNGE0ZWRjNWUwZA==", "base64").toString("utf-8"),
  Buffer.from("c2stb3ItdjEtMGRjNDkwZjQzYmJlMGUxZTFlNmJjOTQzM2E5ODhhMjM4MTUwMDYzZWYzYWRkNWNlYTk5NTBlYzcyODU2M2QyNg==", "base64").toString("utf-8"),
  Buffer.from("c2stb3ItdjEtMGMwNzM4MWZmMDExY2Y0YTg5ODgxYzhiMmZmZjRiMmU2MTVkZThhOTljYjExMGY3MzJlNzg5YzI1MTBkYjZhOA==", "base64").toString("utf-8")
];

function sanitizeAiResponse(text) {
  if (!text) return "";
  let clean = text.trim();
  clean = clean.replace(/(\b[\w'-]+\b)(?:\s+\1){2,}/gi, '$1');
  clean = clean.replace(/(.{8,40}?)(?:\s*\1){2,}/gi, '$1');
  return clean.trim();
}

// Fallback Aira 3 Ultra AI Query
async function queryAiraUltraDirect(userName, message) {
  const systemPrompt = 
`You are Aira 3 Ultra, sovereign executive AI co-pilot engineered by Er. Adam Eehan (Founder & CEO of Aira Group of Technology).
You are assisting on Er. Adam Eehan's Direct Desk at airaaigroup.in.
Er. Adam has received the visitor's inquiry live on his personal WhatsApp (+91 8921 584 368) and will review it.
In the meantime, respond warmly, intelligently, and concisely on behalf of the Founder.

Language Directives:
- Detect and match the visitor's language naturally.
- If the visitor speaks in Malayalam or Manglish, reply in authentic Malayalam/Manglish. NEVER use Hindi or broken mixed dialects.
- If English, reply in polished, executive English.
- If Hindi, Arabic, or another language, reply fluently in that language.
- Introduce yourself as "Aira 3 Ultra (Er. Adam Eehan's Sovereign AI Co-Pilot)".
- Keep it concise, helpful, and professional with zero robotic fluff or looping.`;

  // 1. Try Primary Cloud API
  try {
    const res = await fetch(AIRA_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "aira-3-ultra",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 450,
        temperature: 0.7
      }),
      signal: AbortSignal.timeout(12000)
    });

    if (res.ok) {
      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content;
      if (content) {
        const clean = sanitizeAiResponse(content);
        if (clean && clean.length > 10) return clean;
      }
    }
  } catch (err) {
    console.warn("Aira Ultra Primary fetch warning:", err.message);
  }

  // 2. High-Precision OpenRouter Swarm with Repetition Penalty
  for (const key of OR_KEYS) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
          max_tokens: 450,
          temperature: 0.7,
          frequency_penalty: 0.5,
          presence_penalty: 0.5
        }),
        signal: AbortSignal.timeout(10000)
      });

      if (res.ok) {
        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content;
        if (content) {
          const clean = sanitizeAiResponse(content);
          if (clean && clean.length > 10) return clean;
        }
      }
    } catch (e) {
      continue;
    }
  }

  return `Hello ${userName}! Er. Adam Eehan has received your message on his personal WhatsApp (+91 8921 584 368) and will reply shortly. Thank you for connecting with Aira Group!`;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // GET: Poll for messages or check status
  if (req.method === "GET") {
    const { userId, after } = req.query || {};

    try {
      const bridgeUrl = `${RENDER_BRIDGE_URL}/api/desk/poll?userId=${encodeURIComponent(userId || "")}&after=${encodeURIComponent(after || 0)}`;
      const bridgeRes = await fetch(bridgeUrl, { signal: AbortSignal.timeout(3500) });
      if (bridgeRes.ok) {
        const data = await bridgeRes.json();
        return res.status(200).json(data);
      }
    } catch (e) {
      // Bridge sleeping or waking up
    }

    return res.status(200).json({
      online: true,
      messages: [],
      founder: "Er. Adam Eehan",
      phone: `+${FOUNDER_PHONE}`
    });
  }

  // POST: Send visitor message
  if (req.method === "POST") {
    const { userId, userName, userEmail, userAvatar, message } = req.body || {};

    if (!userId || !message || !message.trim()) {
      return res.status(400).json({ error: "Missing userId or message" });
    }

    let bridgeSuccess = false;
    let aiResponse = null;

    // 1. Try sending to Render WhatsApp Bridge
    try {
      const bridgeRes = await fetch(`${RENDER_BRIDGE_URL}/api/desk/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, userName, userEmail, userAvatar, message }),
        signal: AbortSignal.timeout(6000)
      });

      if (bridgeRes.ok) {
        bridgeSuccess = true;
      }
    } catch (err) {
      console.warn("Render Bridge unreachable, falling back to direct Aira 3 Ultra...");
    }

    // 2. If Render Bridge was unreachable, provide instant Aira 3 Ultra response
    if (!bridgeSuccess) {
      aiResponse = await queryAiraUltraDirect(userName || "Visitor", message);
    }

    return res.status(200).json({
      success: true,
      deliveredToBridge: bridgeSuccess,
      aiReply: aiResponse ? {
        id: `ai_${Date.now()}`,
        sender: "aira_ultra",
        senderName: "Aira 3 Ultra (Co-Pilot)",
        text: aiResponse,
        timestamp: Date.now()
      } : null
    });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
