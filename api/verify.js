// Vercel Serverless Function: Double Opt-In Email Verification
// Engineered for Aira Group of Technology (airaaigroup.in)

import crypto from "crypto";
import { getWelcomeEmailHtml } from "./_emailTemplates.js";
import { sendEmail } from "./_mailer.js";

const SECRET = process.env.VERIFY_SECRET || "aira-sovereign-secret-token-key-2026";
const HOSTINGER_TOKEN = process.env.HOSTINGER_API_TOKEN || "QVeJgNyXciHezaw5fsjAJeTiEXJfBfd4FqwUifna8cfab21c";
const PROFILE_UUID = "623e0772-031e-44fc-8a18-d225af88bad6";

export function generateVerifyToken(email) {
  return crypto.createHmac("sha256", SECRET).update(email.trim().toLowerCase()).digest("hex");
}

export default async function handler(req, res) {
  const { email, token, name } = req.query || {};

  if (!email || !token) {
    return res.status(400).send(renderStatusHtml(false, "Invalid Verification Link", "The confirmation link is missing required parameters. Please subscribe again from our portal."));
  }

  const cleanEmail = email.trim().toLowerCase();
  const displayName = name ? decodeURIComponent(name).trim() : "";
  const expectedToken = generateVerifyToken(cleanEmail);

  if (token !== expectedToken) {
    return res.status(403).send(renderStatusHtml(false, "Verification Link Invalid", "This confirmation link is invalid or has expired. Please subscribe again from our portal."));
  }

  // 1. Sync confirmed subscriber with Hostinger Reach
  try {
    const reachRes = await fetch(`https://developers.hostinger.com/api/reach/v1/profiles/${PROFILE_UUID}/contacts`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HOSTINGER_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "AiraGroup-Portal/1.0"
      },
      body: JSON.stringify({
        email: cleanEmail,
        name: displayName || null,
        subscription_status: "subscribed"
      })
    });
    console.log("[Hostinger Reach Confirmed Sync]:", reachRes.status);
  } catch (err) {
    console.error("[Hostinger Reach Sync Error]:", err.message);
  }

  // 2. Dispatch Welcome Email
  try {
    const welcomeHtml = getWelcomeEmailHtml(displayName);
    await sendEmail({
      to: cleanEmail,
      toName: displayName,
      subject: "Welcome to Aira Group — Sovereign Engineering. Zero Dependency",
      html: welcomeHtml
    });
  } catch (err) {
    console.error("[Welcome Email Dispatch Error]:", err.message);
  }

  // 3. Render Clean Corporate Success Page
  return res.status(200).send(renderStatusHtml(
    true,
    "Subscription Confirmed! 🎉",
    `Thank you for confirming your email (${escapeHtml(cleanEmail)}). You are now an active member of Aira Group Sovereign Engineering Dispatches. Your official welcome dispatch has been sent to your inbox.`
  ));
}

function renderStatusHtml(isSuccess, title, message) {
  const accentColor = isSuccess ? "#10b981" : "#ef4444";
  const icon = isSuccess ? "✓" : "!";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} — Aira Group of Technology</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #07090e;
      color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background-color: #0d121c;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      max-width: 520px;
      width: 100%;
      padding: 40px 32px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }
    .badge-icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: ${isSuccess ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)"};
      border: 2px solid ${accentColor};
      color: ${accentColor};
      font-size: 32px;
      font-weight: bold;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }
    h1 {
      font-size: 24px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 12px;
    }
    p {
      font-size: 15px;
      line-height: 1.6;
      color: #94a3b8;
      margin-bottom: 28px;
    }
    .btn {
      display: inline-block;
      background-color: #1d4ed8;
      color: #ffffff;
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 8px;
      transition: background-color 0.2s;
    }
    .btn:hover {
      background-color: #2563eb;
    }
    .footer-text {
      margin-top: 24px;
      font-size: 12px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge-icon">${icon}</div>
    <h1>${escapeHtml(title)}</h1>
    <p>${message}</p>
    <a href="https://www.airaaigroup.in" class="btn">&larr; Return to Aira Group Homepage</a>
    <div class="footer-text">
      Aira Group of Technology &bull; Sovereign Engineering &bull; Zero Dependency
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
