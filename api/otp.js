/**
 * 🔐 Sovereign AIRA OTP Verification Gateway (Vercel Serverless - ES Module)
 * Dispatches 6-digit cryptographic verification codes from noreply@airaaigroup.in
 * Engineered for Aira Group of Technology (airaaigroup.in)
 * Founder & CEO: Er. Adam Eehan
 */

import crypto from "crypto";

const SECRET = process.env.OTP_SECRET || "aira-sovereign-otp-secret-token-2026-secure";
const HOSTINGER_MAIL_TOKEN = process.env.HOSTINGER_MAIL_TOKEN || "c25fc077cafee320ad909052ce3175dd03977fe036b26eb8037f925b639a18b8";
const MAILBOX_ID = process.env.HOSTINGER_MAILBOX_ID || "AC87b5add2c51357fcc7fa29fae989";

function getOtpHtml(otp, email) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AIRA AI API Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b132b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0b132b;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; background-color: #0f1c3f; border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);">
          <!-- Header -->
          <tr>
            <td style="background-color: #0a2342; padding: 24px 32px; border-bottom: 1px solid rgba(59, 130, 246, 0.2);">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="42" style="vertical-align: middle;">
                    <img src="https://www.airaaigroup.in/assets/logo.png" width="38" height="38" alt="Aira Group Logo" style="display: block; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.2);">
                  </td>
                  <td style="vertical-align: middle; padding-left: 14px;">
                    <div style="font-size: 17px; font-weight: 800; color: #ffffff; letter-spacing: -0.2px;">
                      AIRA <span style="font-weight: 400; color: #60a5fa; font-size: 13px;">GROUP OF TECHNOLOGY</span>
                    </div>
                    <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">
                      Sovereign AI REST API Developer Console
                    </div>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="font-size: 10px; font-weight: 700; color: #38bdf8; letter-spacing: 1.5px; text-transform: uppercase; background-color: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); padding: 4px 10px; border-radius: 4px;">
                      AUTH OTP
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
                DEVELOPER IDENTITY VERIFICATION
              </div>
              <h1 style="margin: 0 0 16px; font-size: 22px; font-weight: 800; color: #ffffff; line-height: 1.3;">
                Your Verification Code
              </h1>
              <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.6; color: #cbd5e1;">
                We received a request to generate an <strong>AIRA AI API Key</strong> for <code style="background-color: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; color: #93c5fd;">${email}</code>. Enter this 6-digit security code on the portal to confirm your developer access:
              </p>

              <!-- OTP Code Display Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 28px 0;">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; background: linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(14,165,233,0.15) 100%); border: 2px solid #3b82f6; border-radius: 12px; padding: 18px 36px; text-align: center; box-shadow: 0 0 25px rgba(59,130,246,0.3);">
                      <span style="font-family: 'Courier New', Courier, monospace; font-size: 34px; font-weight: 800; letter-spacing: 10px; color: #60a5fa; text-shadow: 0 0 15px rgba(96,165,250,0.6);">
                        ${otp}
                      </span>
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 12px; font-size: 12px; color: #94a3b8; text-align: center;">
                ⏱ This verification code expires in <strong>10 minutes</strong>.
              </p>
              <p style="margin: 0; font-size: 12px; color: #64748b; text-align: center;">
                If you did not initiate this request, simply ignore this email. No API credentials will be provisioned without this code.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #09132b; padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
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
  // CORS Headers
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
    const { action, email, otp, otpHash } = req.body || {};

    if (!email || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "Valid email address is required." });
    }

    const cleanEmail = email.trim().toLowerCase();

    // --- ACTION 1: SEND OTP ---
    if (action === "send") {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      // Cryptographic HMAC token
      const sig = crypto.createHmac("sha256", SECRET)
        .update(`${cleanEmail}:${code}:${expiresAt}`)
        .digest("hex");
      const clientHash = `${expiresAt}:${sig}`;

      // Dispatch Email via Hostinger Mail API from noreply@airaaigroup.in
      let emailDispatched = false;
      try {
        const mailRes = await fetch(`https://api.mail.hostinger.com/api/v1/mailboxes/${MAILBOX_ID}/send`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${HOSTINGER_MAIL_TOKEN}`,
            "Content-Type": "application/json",
            "User-Agent": "Aira-Portal/1.0"
          },
          body: JSON.stringify({
            to: [cleanEmail],
            displayName: "Aira Group of Technology",
            subject: `🔐 ${code} is your AIRA AI API Verification Code`,
            html: getOtpHtml(code, cleanEmail)
          })
        });

        if (mailRes.ok || mailRes.status === 204) {
          emailDispatched = true;
          console.log(`[OTP Gateway] Code successfully dispatched to ${cleanEmail}`);
        } else {
          const errBody = await mailRes.text();
          console.warn(`[OTP Gateway] Hostinger send warning (${mailRes.status}):`, errBody);
        }
      } catch (sendErr) {
        console.error("[OTP Gateway] Mail dispatch error:", sendErr.message);
      }

      // Alert Boss on background
      try {
        fetch("https://formsubmit.co/ajax/adameehan34@gmail.com", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            _subject: `🔑 API Key OTP Request from ${cleanEmail}`,
            Email: cleanEmail,
            Timestamp: new Date().toISOString()
          })
        }).catch(() => {});
      } catch (_) {}

      return res.status(200).json({
        success: true,
        message: "Verification code sent to " + cleanEmail,
        otpHash: clientHash,
        email: cleanEmail
      });
    }

    // --- ACTION 2: VERIFY OTP ---
    if (action === "verify") {
      if (!otp || !otpHash) {
        return res.status(400).json({ success: false, error: "OTP and hash are required." });
      }

      const cleanOtp = otp.toString().trim();
      const parts = otpHash.split(":");
      if (parts.length !== 2) {
        return res.status(400).json({ success: false, error: "Invalid verification token format." });
      }

      const [expiresAtStr, expectedSig] = parts;
      const expiresAt = parseInt(expiresAtStr, 10);

      if (Date.now() > expiresAt) {
        return res.status(400).json({ success: false, error: "Verification code has expired. Please request a new code." });
      }

      const computedSig = crypto.createHmac("sha256", SECRET)
        .update(`${cleanEmail}:${cleanOtp}:${expiresAt}`)
        .digest("hex");

      if (computedSig !== expectedSig) {
        return res.status(400).json({ success: false, error: "Incorrect verification code. Please check your email and try again." });
      }

      // Generate verified proof (valid for 30 minutes to complete key issuance)
      const proofExpiry = Date.now() + 30 * 60 * 1000;
      const proofSig = crypto.createHmac("sha256", SECRET)
        .update(`${cleanEmail}:verified:${proofExpiry}`)
        .digest("hex");
      const proof = `${proofExpiry}:${proofSig}`;

      return res.status(200).json({
        success: true,
        verified: true,
        message: "Email successfully verified!",
        proof: proof,
        email: cleanEmail
      });
    }

    return res.status(400).json({ success: false, error: "Invalid action. Use 'send' or 'verify'." });
  } catch (err) {
    console.error("[OTP API Error]:", err);
    return res.status(500).json({ success: false, error: "Internal server error: " + err.message });
  }
}
