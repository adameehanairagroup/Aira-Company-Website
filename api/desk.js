/**
 * 🚀 Sovereign AIRA Founder Desk Gateway (Vercel Serverless)
 * Connects airaaigroup.in visitors directly to Founder Er. Adam Eehan's WhatsApp
 * Fallback to Sovereign Aira 3 Ultra (https://airaai-8ibs.onrender.com)
 */

const https = require('https');

const RENDER_BRIDGE_URL = process.env.RENDER_BRIDGE_URL || 'https://aira-whatsapp-bridge.onrender.com';
const AIRA_ENDPOINT = process.env.AIRA_API_URL || 'https://airaai-8ibs.onrender.com/v1/chat/completions';
const FOUNDER_PHONE = '918921584368';

// Helper: HTTP Request Promise
function fetchJson(url, options = {}, postData = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const reqOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      timeout: options.timeout || 8000
    };

    const req = https.request(reqOptions, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, text: body });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
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
- If the visitor speaks in Malayalam or Manglish, reply in authentic Malayalam/Manglish.
- If English, reply in polished, executive English.
- If Hindi, Arabic, or another language, reply fluently in that language.
- Introduce yourself as "Aira 3 Ultra (Er. Adam Eehan's Sovereign AI Co-Pilot)".
- Keep it concise, helpful, and professional with zero robotic fluff.`;

  try {
    const res = await fetchJson(AIRA_ENDPOINT, { method: 'POST', timeout: 15000 }, {
      model: 'aira-3-ultra',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    const content = res.data?.choices?.[0]?.message?.content;
    if (content) return content.trim();
  } catch (err) {
    console.error('Aira Ultra Direct error:', err.message);
  }

  return `Hello ${userName}! Er. Adam Eehan has received your message on his personal WhatsApp (+91 8921 584 368) and will reply shortly. Thank you for connecting with Aira Group!`;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Poll for messages or check status
  if (req.method === 'GET') {
    const { userId, after } = req.query;

    // Try forwarding to Render WhatsApp bridge if available
    try {
      const bridgeRes = await fetchJson(`${RENDER_BRIDGE_URL}/api/desk/poll?userId=${encodeURIComponent(userId || '')}&after=${encodeURIComponent(after || 0)}`, {
        timeout: 4000
      });
      if (bridgeRes.status === 200 && bridgeRes.data) {
        return res.status(200).json(bridgeRes.data);
      }
    } catch (e) {
      // Bridge sleeping or not yet reachable
    }

    return res.status(200).json({
      online: true,
      messages: [],
      founder: 'Er. Adam Eehan',
      phone: `+${FOUNDER_PHONE}`
    });
  }

  // POST: Send visitor message
  if (req.method === 'POST') {
    const { userId, userName, userEmail, userAvatar, message } = req.body || {};

    if (!userId || !message || !message.trim()) {
      return res.status(400).json({ error: 'Missing userId or message' });
    }

    let bridgeSuccess = false;
    let aiResponse = null;

    // 1. Try sending to Render WhatsApp Bridge
    try {
      const bridgeRes = await fetchJson(`${RENDER_BRIDGE_URL}/api/desk/send`, {
        method: 'POST',
        timeout: 6000
      }, { userId, userName, userEmail, userAvatar, message });

      if (bridgeRes.status === 200) {
        bridgeSuccess = true;
      }
    } catch (err) {
      console.warn('Render Bridge unreachable, generating direct Aira 3 Ultra response...');
    }

    // 2. If Render Bridge is still connecting/pairing, provide instant Aira 3 Ultra response
    if (!bridgeSuccess) {
      aiResponse = await queryAiraUltraDirect(userName || 'Visitor', message);
    }

    return res.status(200).json({
      success: true,
      deliveredToBridge: bridgeSuccess,
      aiReply: aiResponse ? {
        id: `ai_${Date.now()}`,
        sender: 'aira_ultra',
        senderName: 'Aira 3 Ultra (Co-Pilot)',
        text: aiResponse,
        timestamp: Date.now()
      } : null
    });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};
