// Aira Sovereign Mail Dispatcher
// Engineered for Aira Group of Technology (airaaigroup.in)

export async function sendEmail({ to, toName, subject, html }) {
  const RESEND_KEY = process.env.RESEND_API_KEY || "";
  const SENDER_EMAIL = process.env.SENDER_EMAIL || "noreply@airaaigroup.in";
  const SENDER_NAME = process.env.SENDER_NAME || "Aira Group of Technology";

  // 1. Try Resend API
  if (RESEND_KEY) {
    try {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_KEY}`,
          "Content-Type": "application/json",
          "User-Agent": "AiraGroup-Portal/1.0"
        },
        body: JSON.stringify({
          from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
          to: [to],
          subject: subject,
          html: html
        })
      });

      const resendData = await resendRes.json();
      if (resendRes.ok) {
        console.log(`[Resend Success] Email sent to ${to}:`, resendData.id);
        return { success: true, provider: "resend", id: resendData.id };
      } else {
        console.warn(`[Resend Warning] (${resendRes.status}):`, JSON.stringify(resendData));
      }
    } catch (err) {
      console.error("[Resend Exception]:", err.message);
    }
  }

  // 2. Try SMTP if environment credentials exist
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "465", 10),
        secure: process.env.SMTP_SECURE !== "false",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const info = await transporter.sendMail({
        from: `"${SENDER_NAME}" <${process.env.SMTP_USER}>`,
        to: to,
        subject: subject,
        html: html
      });

      console.log(`[SMTP Success] Email sent to ${to}:`, info.messageId);
      return { success: true, provider: "smtp", id: info.messageId };
    } catch (err) {
      console.error("[SMTP Exception]:", err.message);
    }
  }

  return {
    success: false,
    error: "No active email dispatch provider succeeded."
  };
}
