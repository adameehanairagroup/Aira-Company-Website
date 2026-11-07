/**
 * 🚀 Aira Sovereign Email Auto-Reply Webhook (Hostinger & Vercel)
 * Automatically delivers the Executive Dark Mode HTML Auto-Reply
 * when an incoming email is received on contact@airaaigroup.in or me@airaaigroup.in
 */

import { getSupportAutoReplyHtml } from "./_emailTemplates.js";

const HOSTINGER_MAIL_TOKEN = process.env.HOSTINGER_MAIL_TOKEN || "c25fc077cafee320ad909052ce3175dd03977fe036b26eb8037f925b639a18b8";
const RESEND_KEY = process.env.RESEND_API_KEY || "";

// In-memory rate limiting map: email -> lastReplyTimestamp
const recentReplies = new Map();
const COOLDOWN_MS = 30 * 60 * 1000; // 30 minutes cooldown per sender

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Health check
  if (req.method === "GET") {
    return res.status(200).json({
      status: "online",
      service: "Aira Sovereign Email Auto-Reply Webhook",
      targetMailboxes: ["contact@airaaigroup.in", "me@airaaigroup.in"],
      cooldownMinutes: 30
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const payload = req.body || {};
    console.log("[Hostinger Webhook Payload]:", JSON.stringify(payload));

    // Handle test / ping events
    if (payload.event === "test" || payload.type === "test" || payload.ping) {
      console.log("[Hostinger Webhook]: Test ping received successfully!");
      return res.status(200).json({ success: true, message: "Webhook test verified" });
    }

    // Extract message data
    const eventType = payload.event || payload.type || "";
    const data = payload.data || payload;
    const mailboxId = data.mailboxResourceId || payload.mailboxResourceId || "AC87b5add2c51357fcc7fa29fae989";

    // 1. Extract sender information
    let senderEmail = "";
    let senderName = "";
    let subject = "Inquiry & Collaboration";

    if (data.message) {
      senderEmail = data.message.from?.address || data.message.from?.email || "";
      senderName = data.message.from?.name || "";
      subject = data.message.subject || subject;
    } else if (data.from) {
      senderEmail = typeof data.from === "object" ? (data.from.address || data.from.email || "") : data.from;
      senderName = typeof data.from === "object" ? (data.from.name || "") : "";
      subject = data.subject || subject;
    } else if (payload.from) {
      senderEmail = typeof payload.from === "object" ? (payload.from.address || payload.from.email || "") : payload.from;
      senderName = typeof payload.from === "object" ? (payload.from.name || "") : "";
      subject = payload.subject || subject;
    }

    // If message UID is provided but from is not full, fetch message details from Hostinger
    const messageUid = data.uid || data.messageUid || data.message?.uid;
    if (!senderEmail && messageUid) {
      try {
        const fetchRes = await fetch(`https://api.mail.hostinger.com/api/v1/mailboxes/${mailboxId}/folders/INBOX/messages/${messageUid}`, {
          headers: {
            "Authorization": `Bearer ${HOSTINGER_MAIL_TOKEN}`,
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
          }
        });
        if (fetchRes.ok) {
          const msgData = await fetchRes.json();
          const msgObj = msgData?.data || msgData;
          senderEmail = msgObj.from?.address || "";
          senderName = msgObj.from?.name || "";
          subject = msgObj.subject || subject;
        }
      } catch (err) {
        console.warn("[Hostinger Webhook] Failed to fetch message details by UID:", err.message);
      }
    }

    if (!senderEmail || !senderEmail.includes("@")) {
      console.log("[Hostinger Webhook] No valid sender email found, acknowledging webhook.");
      return res.status(200).json({ success: true, message: "Acknowledged (no sender email)" });
    }

    senderEmail = senderEmail.trim().toLowerCase();

    // 2. Anti-Loop & Bot Safeguards
    const ignoredSenders = [
      "contact@airaaigroup.in",
      "me@airaaigroup.in",
      "noreply@airaaigroup.in",
      "mailer-daemon",
      "postmaster",
      "no-reply",
      "noreply",
      "donotreply",
      "notifications@github.com"
    ];

    const isSelfOrBot = ignoredSenders.some(ign => senderEmail.includes(ign));
    if (isSelfOrBot) {
      console.log(`[Hostinger Webhook] Skipping auto-reply to internal/bot address: ${senderEmail}`);
      return res.status(200).json({ success: true, skipped: true, reason: "internal_or_bot" });
    }

    // 3. Sender Rate Limiting (Prevent spam loop)
    const now = Date.now();
    const lastSent = recentReplies.get(senderEmail) || 0;
    if (now - lastSent < COOLDOWN_MS) {
      console.log(`[Hostinger Webhook] Cooldown active for ${senderEmail}. Auto-reply already sent recently.`);
      return res.status(200).json({ success: true, skipped: true, reason: "cooldown_active" });
    }

    recentReplies.set(senderEmail, now);
    // Cleanup old keys if map grows large
    if (recentReplies.size > 1000) {
      for (const [k, v] of recentReplies.entries()) {
        if (now - v > COOLDOWN_MS) recentReplies.delete(k);
      }
    }

    // 4. Generate Executive Dark Mode HTML
    const cleanName = senderName ? senderName.trim() : "";
    const autoReplyHtml = getSupportAutoReplyHtml(cleanName);
    const replySubject = subject.toLowerCase().startsWith("re:")
      ? subject
      : `Re: ${subject} — Aira Group Official Acknowledgment`;

    console.log(`[Hostinger Webhook] Sending Dark Mode Auto-Reply to: ${senderEmail} ("${cleanName}")`);

    // 5. Send via Hostinger Send API
    let dispatched = false;
    let providerUsed = "hostinger";

    try {
      const sendRes = await fetch(`https://api.mail.hostinger.com/api/v1/mailboxes/${mailboxId}/send`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HOSTINGER_MAIL_TOKEN}`,
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        },
        body: JSON.stringify({
          to: [senderEmail],
          displayName: "Aira Group of Technology",
          subject: replySubject,
          html: autoReplyHtml
        })
      });

      if (sendRes.ok || sendRes.status === 204) {
        dispatched = true;
        console.log(`✅ [Hostinger API] Executive Dark Mode Auto-Reply successfully dispatched to ${senderEmail}!`);
      } else {
        const errText = await sendRes.text();
        console.warn(`[Hostinger Send API Warning] Status ${sendRes.status}:`, errText);
      }
    } catch (sendErr) {
      console.error("[Hostinger Send API Error]:", sendErr.message);
    }

    // 6. Resend API Fallback if Hostinger send failed
    if (!dispatched && RESEND_KEY) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "Aira Group of Technology <contact@airaaigroup.in>",
            to: [senderEmail],
            subject: replySubject,
            html: autoReplyHtml
          })
        });

        if (resendRes.ok) {
          dispatched = true;
          providerUsed = "resend";
          console.log(`✅ [Resend Fallback] Executive Dark Mode Auto-Reply dispatched to ${senderEmail}!`);
        }
      } catch (resendErr) {
        console.error("[Resend Fallback Error]:", resendErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      autoReplied: dispatched,
      provider: providerUsed,
      recipient: senderEmail,
      subject: replySubject
    });
  } catch (err) {
    console.error("[Hostinger Webhook Global Error]:", err);
    return res.status(500).json({ error: err.message });
  }
}
