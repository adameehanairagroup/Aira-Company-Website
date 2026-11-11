/**
 * 🔑 Sovereign AIRA API Key Generation Gateway (Vercel Serverless - ES Module)
 * Generates verified API keys for Free & Pro Aira Models
 * Engineered for Aira Group of Technology (airaaigroup.in)
 * Founder & CEO: Er. Adam Eehan
 */

import crypto from "crypto";

const SECRET = process.env.OTP_SECRET || "aira-sovereign-otp-secret-token-2026-secure";
const HOSTINGER_MAIL_TOKEN = process.env.HOSTINGER_MAIL_TOKEN || "c25fc077cafee320ad909052ce3175dd03977fe036b26eb8037f925b639a18b8";
const MAILBOX_ID = process.env.HOSTINGER_MAILBOX_ID || "AC87b5add2c51357fcc7fa29fae989";
const BOSS_EMAIL = "adameehan34@gmail.com";

const PAID_MODELS = ["aira-3-ultra", "aira-deepmind", "aira-cyber-defender"];

const MODEL_LABELS = {
  "aira-flash-1.5": "Aira Flash 1.5 (Free Community)",
  "aira-flash-lite": "Aira Flash Lite (Free High-Speed)",
  "aira-3-ultra": "Aira 3 Ultra (Flagship Engine v3.6 - Pro)",
  "aira-deepmind": "AiraDeepMind (550B MoE Swarm - Pro)",
  "aira-cyber-defender": "Aira Cyber Defender AI (7B Core - Pro)"
};

function getKeyDeliveryHtml(name, apiKey, model, expiryDate, tier) {
  const modelName = MODEL_LABELS[model] || model;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AIRA AI API Credentials</title>
</head>
<body style="margin: 0; padding: 0; background-color: #080f24; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #080f24;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #0d1838; border: 1px solid rgba(59, 130, 246, 0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 12px 50px rgba(0, 0, 0, 0.6);">
          <!-- Header -->
          <tr>
            <td style="background-color: #0a2342; padding: 26px 32px; border-bottom: 1px solid rgba(59, 130, 246, 0.25);">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="42" style="vertical-align: middle;">
                    <img src="https://www.airaaigroup.in/assets/logo.png" width="40" height="40" alt="Aira Group Logo" style="display: block; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.2);">
                  </td>
                  <td style="vertical-align: middle; padding-left: 14px;">
                    <div style="font-size: 18px; font-weight: 800; color: #ffffff; letter-spacing: -0.2px;">
                      AIRA <span style="font-weight: 400; color: #60a5fa; font-size: 13px;">GROUP OF TECHNOLOGY</span>
                    </div>
                    <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">
                      Sovereign AI REST API Developer Console
                    </div>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="font-size: 10px; font-weight: 700; color: #10b981; letter-spacing: 1.5px; text-transform: uppercase; background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 5px 12px; border-radius: 6px;">
                      ${tier.toUpperCase()} ACTIVE
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 36px 32px;">
              <div style="font-size: 11px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">
                PROVISIONED API CREDENTIALS
              </div>
              <h1 style="margin: 0 0 16px; font-size: 22px; font-weight: 800; color: #ffffff;">
                Your API Key is Ready
              </h1>
              <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #cbd5e1;">
                Hello <strong>${name}</strong>, your access token for <strong>${modelName}</strong> has been provisioned on the Aira Sovereign Neural Cluster.
              </p>

              <!-- Credentials Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #08112b; border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 12px; margin-bottom: 24px; padding: 18px 22px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
                      API Secret Key
                    </div>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 15px; font-weight: 700; color: #60a5fa; word-break: break-all; background-color: rgba(0,0,0,0.4); padding: 10px 14px; border-radius: 8px; border: 1px dashed rgba(59,130,246,0.5);">
                      ${apiKey}
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 14px; font-size: 12px; color: #94a3b8;">
                      <span><strong>Model:</strong> ${model}</span>
                      <span><strong>Expires:</strong> ${expiryDate}</span>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Quick Start cURL -->
              <div style="font-size: 12px; font-weight: 700; color: #93c5fd; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                Quick Start Integration (cURL)
              </div>
              <pre style="background-color: #050a1a; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; font-family: 'Courier New', monospace; font-size: 12px; color: #e2e8f0; overflow-x: auto; line-height: 1.5; margin: 0 0 24px;">curl https://airaai-8ibs.onrender.com/v1/chat/completions \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${model}",
    "messages": [{"role": "user", "content": "Hello Aira!"}]
  }'</pre>

              <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5;">
                Keep your secret key confidential. Never expose it in client-side repositories or public frontends.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #060c1d; padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
              <p style="margin: 0 0 4px; font-size: 11px; color: #94a3b8;">
                <strong>Aira Group of Technology</strong> &bull; Sovereign AI & Systems Architecture
              </p>
              <p style="margin: 0; font-size: 10px; color: #64748b;">
                Founder & CEO: Er. Adam Eehan &bull; <a href="https://airaaigroup.in" style="color: #60a5fa; text-decoration: none;">airaaigroup.in</a> &bull; noreply@airaaigroup.in
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed. Use POST." });
  }

  try {
    const { keyName, model, expiry, email, proof, paymentId } = req.body || {};

    if (!email || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "Verified email address is required." });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanKeyName = (keyName && keyName.trim()) ? keyName.trim() : "Default API Client";
    const selectedModel = model || "aira-flash-1.5";
    const selectedExpiry = expiry || "30d";

    // 1. Verify Cryptographic Proof from OTP verification
    if (!proof) {
      return res.status(401).json({ success: false, error: "Email verification proof is missing. Please verify your email with OTP." });
    }

    const proofParts = proof.split(":");
    if (proofParts.length !== 2) {
      return res.status(401).json({ success: false, error: "Invalid verification proof format." });
    }

    const [proofExpiryStr, expectedSig] = proofParts;
    const proofExpiry = parseInt(proofExpiryStr, 10);

    if (Date.now() > proofExpiry) {
      return res.status(401).json({ success: false, error: "Email verification has expired. Please verify with OTP again." });
    }

    const computedSig = crypto.createHmac("sha256", SECRET)
      .update(`${cleanEmail}:verified:${proofExpiry}`)
      .digest("hex");

    if (computedSig !== expectedSig) {
      return res.status(401).json({ success: false, error: "Invalid verification signature. Please verify with OTP again." });
    }

    // 2. Check Tier (Free vs Paid)
    const isPaid = PAID_MODELS.includes(selectedModel);
    if (isPaid && !paymentId) {
      return res.status(402).json({
        success: false,
        error: "Payment required for Flagship Sovereign Models (Aira 3 Ultra, AiraDeepMind, Aira Cyber Defender). Please complete monthly subscription via UPI / QR."
      });
    }

    // 3. Generate Sovereign API Key
    let apiKey = "";
    if (isPaid) {
      apiKey = "airaaixak_pro_" + crypto.randomBytes(14).toString("hex");
    } else {
      apiKey = "airaaixak" + crypto.randomBytes(14).toString("hex");
    }

    // 4. Calculate Expiry Date string
    let expiryDateStr = "Never (Permanent)";
    const now = new Date();
    if (selectedExpiry === "30d") {
      const exp = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      expiryDateStr = exp.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } else if (selectedExpiry === "90d") {
      const exp = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
      expiryDateStr = exp.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } else if (selectedExpiry === "365d") {
      const exp = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
      expiryDateStr = exp.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }

    // 5. Send API Key to User's Email via Hostinger Mail API
    try {
      fetch(`https://api.mail.hostinger.com/api/v1/mailboxes/${MAILBOX_ID}/send`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HOSTINGER_MAIL_TOKEN}`,
          "Content-Type": "application/json",
          "User-Agent": "Aira-Portal/1.0"
        },
        body: JSON.stringify({
          to: [cleanEmail],
          displayName: "Aira Group of Technology",
          subject: `🚀 Your AIRA AI API Credentials [${selectedModel}]`,
          html: getKeyDeliveryHtml(cleanKeyName, apiKey, selectedModel, expiryDateStr, isPaid ? "Pro" : "Free")
        })
      }).catch(err => console.warn("[Key Delivery] Email error:", err.message));
    } catch (_) {}

    // 6. Alert Er. Adam Eehan
    try {
      fetch("https://formsubmit.co/ajax/" + BOSS_EMAIL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: `🔑 New API Key Issued: ${selectedModel} (${isPaid ? "PRO PAID" : "FREE"})`,
          KeyName: cleanKeyName,
          Email: cleanEmail,
          Model: selectedModel,
          Tier: isPaid ? "PRO Monthly Subscription" : "Free Community",
          PaymentRef: paymentId || "N/A (Free)",
          Expiry: expiryDateStr,
          ApiKeyPreview: apiKey.substring(0, 15) + "..."
        })
      }).catch(() => {});
    } catch (_) {}

    return res.status(200).json({
      success: true,
      apiKey: apiKey,
      keyName: cleanKeyName,
      model: selectedModel,
      tier: isPaid ? "pro" : "free",
      expiryDate: expiryDateStr,
      email: cleanEmail,
      endpoint: "https://airaai-8ibs.onrender.com/v1/chat/completions"
    });
  } catch (err) {
    console.error("[Generate Key Error]:", err);
    return res.status(500).json({ success: false, error: "Internal server error: " + err.message });
  }
}
