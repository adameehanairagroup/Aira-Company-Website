// Vercel Serverless Function: Automated Double Opt-In Subscription
// Engineered for Aira Group of Technology (airaaigroup.in)

import { generateVerifyToken } from "./verify.js";
import { getConfirmationEmailHtml } from "./_emailTemplates.js";
import { sendEmail } from "./_mailer.js";

const HOSTINGER_TOKEN = process.env.HOSTINGER_API_TOKEN || "QVeJgNyXciHezaw5fsjAJeTiEXJfBfd4FqwUifna8cfab21c";
const PROFILE_UUID = "623e0772-031e-44fc-8a18-d225af88bad6";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { email, name } = req.body || {};

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email address is required." });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name ? name.trim() : "";

    // 1. Generate secure cryptographic verification link
    const token = generateVerifyToken(cleanEmail);
    const host = req.headers["x-forwarded-host"] || req.headers.host || "www.airaaigroup.in";
    const proto = req.headers["x-forwarded-proto"] || "https";
    const verifyUrl = `${proto}://${host}/api/verify?email=${encodeURIComponent(cleanEmail)}&token=${token}${cleanName ? `&name=${encodeURIComponent(cleanName)}` : ""}`;

    // 2. Dispatch Confirmation Email
    const confirmHtml = getConfirmationEmailHtml(cleanName, verifyUrl);
    const mailResult = await sendEmail({
      to: cleanEmail,
      toName: cleanName,
      subject: "Verify Your Subscription — Aira Group of Technology",
      html: confirmHtml
    });

    console.log("[Confirmation Mail Dispatch Result]:", mailResult);

    // 3. Register contact with Hostinger Reach
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
          name: cleanName || null
        })
      });
      console.log("[Hostinger Reach Contact Sync]:", reachRes.status);
    } catch (err) {
      console.warn("[Hostinger Sync Warning]:", err.message);
    }

    return res.status(200).json({
      success: true,
      message: "Confirmation email sent! Please check your inbox and click the verification button."
    });
  } catch (err) {
    console.error("[Subscribe API Exception]:", err);
    return res.status(500).json({ error: "Internal server error. Please try again later." });
  }
}
