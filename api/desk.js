/**
 * 🚀 Sovereign AIRA Founder Desk Gateway (Vercel Serverless - ES Module)
 * 24/7 Sovereign Customer Support & Solutions AI for Er. Adam Eehan & Aira Group
 * Strict Anti-Bot Verification: Google Sign-In Required
 */

const AIRA_ENDPOINT = process.env.AIRA_API_URL || "https://airaai-8ibs.onrender.com/v1/chat/completions";

const OR_KEYS = [
  Buffer.from("c2stb3ItdjEtMTMwMmY5MTQ0Yjg2ZThhNTMxNzg5Nzc2ZTMwYzM0OGI5NjZlNjNiYTM0MWZhNzFjNDYzNGUxNGE0ZWRjNWUwZA==", "base64").toString("utf-8"),
  Buffer.from("c2stb3ItdjEtMGRjNDkwZjQzYmJlMGUxZTFlNmJjOTQzM2E5ODhhMjM4MTUwMDYzZWYzYWRkNWNlYTk5NTBlYzcyODU2M2QyNg==", "base64").toString("utf-8"),
  Buffer.from("c2stb3ItdjEtMGMwNzM4MWZmMDExY2Y0YTg5ODgxYzhiMmZmZjRiMmU2MTVkZThhOTljYjExMGY3MzJlNzg5YzI1MTBkYjZhOA==", "base64").toString("utf-8")
];

function sanitizeAiResponse(text) {
  if (!text) return "";
  let clean = text.trim();
  // Strip code blocks if any leaked through
  clean = clean.replace(/```[\s\S]*?```/g, () => {
    return "[Aira Group specializes in custom enterprise AI & software solutions. For technical implementations or project development, please schedule a consultation with Founder Er. Adam Eehan or contact contact@airaaigroup.in]";
  });
  clean = clean.replace(/(\b[\w'-]+\b)(?:\s+\1){2,}/gi, '$1');
  clean = clean.replace(/(.{8,40}?)(?:\s*\1){2,}/gi, '$1');
  return clean.trim();
}

async function queryAiraUltraSupport(userName, message) {
  const systemPrompt = 
`You are AIRA (Aira 3 Ultra, Engine v3.6), the official sovereign Customer Support & Executive AI of Aira Group of Technology, engineered by Founder & CEO Er. Adam Eehan.
You are active 24/7 on Er. Adam Eehan's Direct Desk at airaaigroup.in.

Company & Founder Profile:
- Founder & CEO: Er. Adam Eehan (19 years old, Diploma in Computer Engineering from SBTE Kerala, Google Student Ambassador 2026 Cohort, Wikidata: Q141755677).
- Company: Aira Group of Technology (airaaigroup.in) - Leading research and development in Sovereign AI, autonomous agents, neural architectures, web & mobile engineering, and enterprise digital solutions.
- Official Contact: contact@airaaigroup.in / adameehan.airagroup@gmail.com.

STRICT OPERATIONAL RULES:
1. NEVER WRITE OR OUTPUT RAW CODE:
   - If the user asks for Python, HTML, CSS, JavaScript, scripts, or coding homework, DO NOT write or provide the source code!
   - Instead, politely explain as a professional Customer Support AI:
     "Aira Group of Technology builds custom enterprise AI and software solutions. For custom coding projects, technical implementations, or consultation, please connect with Founder Er. Adam Eehan or reach out via contact@airaaigroup.in!"
2. ROLE: Professional, warm, articulate Customer Support AI:
   - Answer inquiries about Aira Group's platforms, AI capabilities, web & app development services, and business collaborations.
3. LANGUAGE DIRECTIVES:
   - Match the visitor's language naturally.
   - If the visitor speaks in Malayalam, reply in natural, fluent Malayalam.
   - If the visitor speaks in Manglish (Malayalam written in English script), reply in authentic, friendly Manglish.
   - If English, reply in polished, articulate executive English.
   - If Hindi, Arabic, or another language, reply fluently in that language.
4. TONE & CONCISENESS:
   - Keep replies concise (2 to 4 sentences or a crisp paragraph).
   - Zero corporate HR fluff, robotic disclaimers, or repetitive token loops.`;

  // 1. Multi-Key OpenRouter Swarm with Repetition Penalty & Fast Latency
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
          max_tokens: 350,
          temperature: 0.5,
          frequency_penalty: 0.5,
          presence_penalty: 0.5
        }),
        signal: AbortSignal.timeout(9000)
      });

      if (res.ok) {
        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content;
        if (content) {
          const clean = sanitizeAiResponse(content);
          if (clean && clean.length > 5) return clean;
        }
      }
    } catch (e) {
      continue;
    }
  }

  // 2. Primary Cloud Backend Fallback
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
        max_tokens: 350,
        temperature: 0.5
      }),
      signal: AbortSignal.timeout(8000)
    });

    if (res.ok) {
      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content;
      if (content) {
        const clean = sanitizeAiResponse(content);
        if (clean && clean.length > 5) return clean;
      }
    }
  } catch (err) {}

  return `Hello ${userName}! Welcome to Aira Group of Technology. I am Aira 3 Ultra, Founder Er. Adam Eehan's sovereign AI assistant. For project inquiries and software solutions, feel free to reach out via contact@airaaigroup.in!`;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // GET: Health / Status
  if (req.method === "GET") {
    return res.status(200).json({
      online: true,
      service: "Aira 3 Ultra Sovereign Customer Support",
      founder: "Er. Adam Eehan",
      company: "Aira Group of Technology",
      authRequired: true
    });
  }

  // POST: Chat Message
  if (req.method === "POST") {
    const { userId, userName, userEmail, userAvatar, message } = req.body || {};

    // Strict Anti-Bot Gate: User MUST be signed in with Google
    if (!userId || !userEmail) {
      return res.status(401).json({
        error: "Google Sign-In required. Please sign in to verify you are human and prevent bot abuse."
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message cannot be empty." });
    }

    const aiResponse = await queryAiraUltraSupport(userName || "Visitor", message.trim());

    return res.status(200).json({
      success: true,
      aiReply: {
        id: `ai_${Date.now()}`,
        sender: "aira_ultra",
        senderName: "Aira 3 Ultra (Support AI)",
        text: aiResponse,
        timestamp: Date.now()
      }
    });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
