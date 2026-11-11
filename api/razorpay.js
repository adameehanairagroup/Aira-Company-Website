/**
 * 💳 AIRA REST API Gateway - Razorpay Integration
 * Supports Debit Cards, Credit Cards, NetBanking, UPI, and Wallets
 * Aira Group of Technology • Er. Adam Eehan
 * Route: /api/razorpay
 */

import crypto from "crypto";

const RZP_KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_TxofzW5ecpQ1MX";
const RZP_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "20rXbEuZDFtRoh1pUE0haX5w";
const BASIC_AUTH = Buffer.from(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`).toString("base64");

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { action } = req.body || req.query || {};

  try {
    // 1. CREATE ORDER (Debit Card / Credit Card / NetBanking / UPI)
    if (action === "create_order" || (req.method === "POST" && !action)) {
      const { amount, model, clientName, clientEmail } = req.body || {};
      const amountINR = parseFloat(amount) || 499;
      const amountPaise = Math.round(amountINR * 100);

      const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${BASIC_AUTH}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: amountPaise,
          currency: "INR",
          receipt: `rcpt_${Date.now().toString(36)}`,
          notes: {
            company: "Aira Group of Technology",
            founder: "Er. Adam Eehan",
            model: model || "Aira 3 Ultra",
            client_name: clientName || "Aira API Client",
            client_email: clientEmail || ""
          }
        })
      });

      const orderData = await rzpRes.json();
      if (!rzpRes.ok) {
        console.error("[Razorpay Order Error]:", orderData);
        return res.status(rzpRes.status).json({ success: false, error: "Failed to create Razorpay Order", details: orderData });
      }

      return res.status(200).json({
        success: true,
        keyId: RZP_KEY_ID,
        order: orderData,
        amountINR: amountINR
      });
    }

    // 2. VERIFY PAYMENT SIGNATURE
    if (action === "verify_payment") {
      const { order_id, payment_id, signature } = req.body || {};

      if (!order_id || !payment_id || !signature) {
        return res.status(400).json({ success: false, error: "order_id, payment_id, and signature are required." });
      }

      const expectedSignature = crypto
        .createHmac("sha256", RZP_KEY_SECRET)
        .update(`${order_id}|${payment_id}`)
        .digest("hex");

      if (expectedSignature !== signature) {
        return res.status(400).json({ success: false, error: "Invalid payment signature verification failed." });
      }

      return res.status(200).json({
        success: true,
        verified: true,
        paymentId: payment_id,
        orderId: order_id
      });
    }

    // 3. PUBLIC CONFIG GET
    if (req.method === "GET") {
      return res.status(200).json({
        success: true,
        keyId: RZP_KEY_ID
      });
    }

    return res.status(400).json({ success: false, error: "Invalid action requested." });
  } catch (err) {
    console.error("[Razorpay Gateway Error]:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
