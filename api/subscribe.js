// Vercel Serverless Function: Automated Hostinger Reach Subscription
// Engineered for Aira Group of Technology (airaaigroup.in)

export default async function handler(req, res) {
  // Set CORS headers
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

    const HOSTINGER_TOKEN = process.env.HOSTINGER_API_TOKEN || "QVeJgNyXciHezaw5fsjAJeTiEXJfBfd4FqwUifna8cfab21c";
    const PROFILE_UUID = "623e0772-031e-44fc-8a18-d225af88bad6";
    const REACH_URL = `https://developers.hostinger.com/api/reach/v1/profiles/${PROFILE_UUID}/contacts`;

    const payload = {
      email: email.trim().toLowerCase(),
      name: name ? name.trim() : null
    };

    const hostingerRes = await fetch(REACH_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HOSTINGER_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "AiraGroup-Portal/1.0"
      },
      body: JSON.stringify(payload)
    });

    const responseText = await hostingerRes.text();

    if (!hostingerRes.ok) {
      console.error("[Hostinger Reach Error]:", hostingerRes.status, responseText);
      return res.status(hostingerRes.status).json({
        error: "Failed to sync subscription with Hostinger.",
        details: responseText
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subscription confirmed! Please check your email to verify your subscription."
    });
  } catch (err) {
    console.error("[Subscribe API Exception]:", err);
    return res.status(500).json({ error: "Internal server error. Please try again later." });
  }
}
