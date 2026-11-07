// Aira Corporate Email Templates
// Aesthetic: Pure Corporate Luxury matching airaaigroup.in
// Palette: Deep Royal Navy (#0a2342), Crisp Slate (#f1f5f9), Royal Blue (#1d4ed8), Pure White (#ffffff)

export function getConfirmationEmailHtml(name, confirmUrl) {
  const safeName = name ? escapeHtml(name) : "Colleague";
  const safeUrl = escapeHtml(confirmUrl);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirm Your Subscription — Aira Group of Technology</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
  <div style="display: none; font-size: 1px; color: #f1f5f9; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Please verify your email address to complete your subscription to Aira Group Sovereign Engineering Dispatches.
  </div>
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(10, 35, 66, 0.05);">
          <!-- Top Header -->
          <tr>
            <td style="background-color: #0a2342; padding: 24px 32px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="44" style="vertical-align: middle;">
                    <img src="https://www.airaaigroup.in/assets/logo.png" width="40" height="40" alt="Aira Group Logo" style="display: block; border-radius: 8px; width: 40px; height: 40px; border: 1px solid rgba(255, 255, 255, 0.2);">
                  </td>
                  <td style="vertical-align: middle; padding-left: 14px;">
                    <div style="font-size: 18px; font-weight: 800; color: #ffffff; letter-spacing: -0.3px; line-height: 1.2;">
                      AIRA <span style="font-weight: 500; color: #93c5fd; font-size: 14px;">GROUP OF TECHNOLOGY</span>
                    </div>
                    <div style="font-size: 11px; color: #cbd5e1; margin-top: 2px; letter-spacing: 0.5px;">
                      airaaigroup.in
                    </div>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="font-size: 10px; font-weight: 700; color: #93c5fd; letter-spacing: 1.5px; text-transform: uppercase; border: 1px solid rgba(147, 197, 253, 0.3); padding: 4px 10px; border-radius: 4px;">
                      Verification
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 36px 32px 28px;">
              <div style="font-size: 12px; font-weight: 700; color: #1d4ed8; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 8px;">
                SUBSCRIPTION CONFIRMATION
              </div>
              <h1 style="margin: 0 0 16px; font-size: 24px; font-weight: 800; color: #0a2342; line-height: 1.3;">
                Confirm Your Subscription to Aira Group Dispatches
              </h1>
              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #334155;">
                Hello <strong>${safeName}</strong>,
              </p>
              <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6; color: #475569;">
                Thank you for your interest in <strong>Aira Group of Technology</strong>. We publish verified engineering releases, sovereign artificial intelligence architectures, bare-metal kernels, and cellular mesh communication directly from Founder &amp; CEO Er. Adam Eehan.
              </p>
              <p style="margin: 0 0 28px; font-size: 15px; line-height: 1.6; color: #475569;">
                To complete your subscription and verify that this email belongs to you, please click the confirmation button below:
              </p>
              <!-- Action Button -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td align="center">
                    <a href="${safeUrl}" target="_blank" style="display: inline-block; background-color: #1d4ed8; color: #ffffff; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px; box-shadow: 0 4px 14px rgba(29, 78, 216, 0.25);">
                      Confirm Subscription &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px;">
                <div style="font-size: 12px; color: #64748b; line-height: 1.5;">
                  <strong>Button not working?</strong> Copy and paste this URL into your browser:<br/>
                  <a href="${safeUrl}" style="color: #1d4ed8; word-break: break-all; font-size: 11px;">${safeUrl}</a>
                </div>
              </div>
              <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">
                <strong>Note:</strong> If you did not request this subscription, no action is required. You will never be added without explicit confirmation.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 32px; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; color: #0a2342;">
                Aira Group of Technology
              </p>
              <p style="margin: 0 0 12px; font-size: 11px; color: #64748b;">
                Sovereign Deep-Tech &amp; AI Engineering &bull; Kerala, India
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                <a href="https://www.airaaigroup.in/privacy" style="color: #64748b; text-decoration: underline;">Privacy Policy</a> &bull; 
                <a href="https://www.airaaigroup.in/terms" style="color: #64748b; text-decoration: underline;">Terms of Service</a> &bull; 
                <a href="https://www.airaaigroup.in" style="color: #64748b; text-decoration: underline;">Official Portal</a>
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

export function getWelcomeEmailHtml(name) {
  const safeName = name ? escapeHtml(name) : "Colleague";

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Welcome to Aira Group of Technology</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; }
    @media screen and (max-width: 600px) {
      .container { width: 100% !important; max-width: 100% !important; }
      .mobile-p { padding: 24px 20px !important; }
      .mobile-title { font-size: 22px !important; line-height: 1.3 !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">

  <!-- Preheader -->
  <div style="display: none; font-size: 1px; color: #f1f5f9; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Welcome to Aira Group of Technology — Sovereign engineering, bare-metal systems, and secure enterprise software.
  </div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 36px 14px;">

        <!-- Main Container: 600px -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="container" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(10, 35, 66, 0.05);">

          <!-- Top Brand Header Bar (Deep Navy #0a2342) -->
          <tr>
            <td style="background-color: #0a2342; padding: 24px 32px;" class="mobile-p">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="44" style="vertical-align: middle;">
                    <img src="https://www.airaaigroup.in/assets/logo.png" width="40" height="40" alt="Aira Group Logo" style="display: block; border-radius: 8px; width: 40px; height: 40px; border: 1px solid rgba(255, 255, 255, 0.2);">
                  </td>
                  <td style="vertical-align: middle; padding-left: 14px;">
                    <div style="font-size: 18px; font-weight: 800; color: #ffffff; letter-spacing: -0.3px; line-height: 1.2;">
                      AIRA <span style="font-weight: 500; color: #93c5fd; font-size: 14px;">GROUP OF TECHNOLOGY</span>
                    </div>
                    <div style="font-size: 11px; color: #cbd5e1; margin-top: 2px; letter-spacing: 0.5px;">
                      airaaigroup.in
                    </div>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="font-size: 10px; font-weight: 700; color: #93c5fd; letter-spacing: 1.5px; text-transform: uppercase; border: 1px solid rgba(147, 197, 253, 0.3); padding: 4px 10px; border-radius: 4px;">
                      Official Dispatch
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td style="padding: 36px 32px 28px;" class="mobile-p">

              <div style="font-size: 12px; font-weight: 700; color: #1d4ed8; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 8px;">
                CONFIRMATION &amp; ONBOARDING
              </div>

              <h1 class="mobile-title" style="margin: 0 0 18px; font-size: 26px; line-height: 1.3; font-weight: 800; color: #0a2342; letter-spacing: -0.5px;">
                Welcome to Aira Group of Technology
              </h1>

              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #334155;">
                Dear <strong>${safeName}</strong>,
              </p>

              <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6; color: #475569;">
                We are pleased to welcome you. Thank you for connecting with <strong>Aira Group of Technology</strong> &mdash; an independent deep-tech engineering enterprise building sovereign artificial intelligence, bare-metal kernels, and mission-critical cloud and cellular platforms from Kerala, India.
              </p>

              <!-- Executive Feature Box -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #1d4ed8; border-radius: 6px; margin: 24px 0;">
                <tr>
                  <td style="padding: 20px 22px;">
                    <div style="font-size: 14px; font-weight: 700; color: #0a2342; margin-bottom: 12px; letter-spacing: 0.2px;">
                      What You Can Expect From Our Engineering Division:
                    </div>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="20" valign="top" style="font-size: 13px; color: #1d4ed8; line-height: 1.6; font-weight: bold;">&bull;</td>
                        <td style="padding-left: 8px; font-size: 14px; line-height: 1.6; color: #334155;">
                          <strong>Dedicated Technical Contact:</strong> Direct engineering access with zero bureaucratic delays.
                        </td>
                      </tr>
                      <tr><td height="8"></td></tr>
                      <tr>
                        <td width="20" valign="top" style="font-size: 13px; color: #1d4ed8; line-height: 1.6; font-weight: bold;">&bull;</td>
                        <td style="padding-left: 8px; font-size: 14px; line-height: 1.6; color: #334155;">
                          <strong>Transparent Architecture:</strong> Detailed technical roadmaps, rigorous milestones, and verifiable benchmarks.
                        </td>
                      </tr>
                      <tr><td height="8"></td></tr>
                      <tr>
                        <td width="20" valign="top" style="font-size: 13px; color: #1d4ed8; line-height: 1.6; font-weight: bold;">&bull;</td>
                        <td style="padding-left: 8px; font-size: 14px; line-height: 1.6; color: #334155;">
                          <strong>Sovereign Execution:</strong> High-performance engineering built to scale with zero foreign corporate dependencies.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps Section -->
              <div style="font-size: 14px; font-weight: 700; color: #0a2342; margin: 24px 0 12px; letter-spacing: 0.2px;">
                Recommended Next Steps:
              </div>

              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td width="24" valign="top" style="font-size: 13px; font-weight: 700; color: #1d4ed8; line-height: 1.6;">1.</td>
                  <td style="padding-left: 8px; font-size: 14px; line-height: 1.6; color: #475569;">
                    Reply to this email with your project vision, technical inquiry, or architectural requirements.
                  </td>
                </tr>
                <tr><td height="8"></td></tr>
                <tr>
                  <td width="24" valign="top" style="font-size: 13px; font-weight: 700; color: #1d4ed8; line-height: 1.6;">2.</td>
                  <td style="padding-left: 8px; font-size: 14px; line-height: 1.6; color: #475569;">
                    Schedule a complimentary technical discovery consultation directly with our engineering leadership.
                  </td>
                </tr>
                <tr><td height="8"></td></tr>
                <tr>
                  <td width="24" valign="top" style="font-size: 13px; font-weight: 700; line-height: 1.6; color: #1d4ed8;">3.</td>
                  <td style="padding-left: 8px; font-size: 14px; line-height: 1.6; color: #475569;">
                    Our team will formulate a comprehensive architectural roadmap and execution strategy.
                  </td>
                </tr>
              </table>

              <!-- Primary CTA Button (Corporate Royal Blue #1d4ed8) -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 12px 0 20px;">
                <tr>
                  <td align="center">
                    <a href="https://airaaigroup.in" target="_blank" style="display: inline-block; background-color: #1d4ed8; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 700; padding: 14px 32px; border-radius: 8px; box-shadow: 0 4px 14px rgba(29, 78, 216, 0.25); letter-spacing: 0.2px;">
                      Schedule Technical Discovery Call &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 28px; font-size: 12px; color: #64748b; text-align: center;">
                No obligation required. The initial technical consultation is fully complimentary.
              </p>

              <!-- Founder Executive Signature Block -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid #e2e8f0; padding-top: 24px;">
                <tr>
                  <td>
                    <div style="font-size: 13px; color: #64748b; margin-bottom: 6px;">
                      Sincerely,
                    </div>
                    <div style="font-size: 16px; font-weight: 800; color: #0a2342; letter-spacing: -0.2px;">
                      Er. Adam Eehan
                    </div>
                    <div style="font-size: 13px; font-weight: 600; color: #1d4ed8; margin-top: 2px;">
                      Founder &amp; Chief Executive Officer
                    </div>
                    <div style="font-size: 13px; color: #475569; margin-top: 2px;">
                      Aira Group of Technology
                    </div>
                    <div style="font-size: 12px; color: #64748b; margin-top: 8px; line-height: 1.5;">
                      <a href="mailto:contact@airaaigroup.in" style="color: #1d4ed8; text-decoration: none;">contact@airaaigroup.in</a>
                      &nbsp;&bull;&nbsp; <a href="https://airaaigroup.in" style="color: #1d4ed8; text-decoration: none;">airaaigroup.in</a>
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Corporate Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 32px; border-top: 1px solid #e2e8f0;" class="mobile-p">
              <p style="margin: 0 0 8px; font-size: 12px; line-height: 1.6; color: #64748b;">
                <strong>Aira Group of Technology</strong> &bull; Technopark, Thiruvananthapuram, Kerala, India
              </p>
              <p style="margin: 0 0 8px; font-size: 11px; line-height: 1.6; color: #64748b;">
                You received this communication because you connected with Aira Group of Technology.
                <br>
                <a href="https://airaaigroup.in/privacy" style="color: #1d4ed8; text-decoration: underline;">Privacy Policy</a>
                &nbsp;&bull;&nbsp;
                <a href="https://airaaigroup.in/terms" style="color: #1d4ed8; text-decoration: underline;">Terms of Service</a>
                &nbsp;&bull;&nbsp;
                <a href="https://airaaigroup.in" style="color: #1d4ed8; text-decoration: underline;">Official Portal</a>
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                &copy; 2026 Aira Group of Technology. All rights reserved. Sovereign Deep-Tech &amp; AI Engineering.
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

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


export function getSupportAutoReplyHtml(name) {
  const safeName = name ? escapeHtml(name) : 'Valued Contact';
  const tpl = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Thank You for Contacting Aira Group of Technology</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    :root {
      color-scheme: dark;
      supported-color-schemes: dark;
    }
    body, table, td, a {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    body {
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      background-color: #060d19 !important;
      color: #cbd5e1;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    @media only screen and (max-width: 620px) {
      .container-table {
        width: 100% !important;
        border-radius: 0 !important;
      }
      .mobile-p {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      .mobile-stack {
        display: block !important;
        width: 100% !important;
      }
      .mobile-stack-right {
        display: block !important;
        width: 100% !important;
        text-align: left !important;
        margin-top: 12px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #060d19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #cbd5e1;">

  <!-- Preheader text (Hidden in email body, visible in inbox preview) -->
  <div style="display: none; font-size: 1px; color: #060d19; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Your message has been safely received by the executive desk of Founder Er. Adam Eehan & Co-Founder Anandhakrishnan H. We will respond within 24 business hours.
  </div>

  <!-- Background Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #060d19;">
    <tr>
      <td align="center" style="padding: 40px 12px;">

        <!-- Main Card Container (Rich Midnight Obsidian - NOT pure black) -->
        <table role="presentation" class="container-table" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #0c182b; border: 1px solid #1e3557; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);">

          <!-- Top Gradient Accent Bar -->
          <tr>
            <td style="background: linear-gradient(90deg, #38bdf8 0%, #2563eb 50%, #818cf8 100%); height: 4px; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- HEADER -->
          <tr>
            <td class="mobile-p" style="padding: 28px 32px 20px 32px; background-color: #091424; border-bottom: 1px solid #162a45;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="46" style="vertical-align: middle;">
                    <img src="https://airaaigroup.in/assets/logo.png" width="44" height="44" alt="Aira Group Logo" style="display: block; border-radius: 10px; width: 44px; height: 44px; border: 1px solid rgba(56, 189, 248, 0.3); background-color: #0a1b33;">
                  </td>
                  <td style="vertical-align: middle; padding-left: 14px;">
                    <div style="font-size: 19px; font-weight: 800; color: #ffffff; letter-spacing: -0.3px; line-height: 1.2;">
                      AIRA <span style="font-weight: 500; color: #38bdf8; font-size: 14px;">GROUP OF TECHNOLOGY</span>
                    </div>
                    <div style="font-size: 11px; color: #94a3b8; margin-top: 3px; letter-spacing: 0.5px;">
                      airaaigroup.in &bull; Sovereign Digital Systems
                    </div>
                  </td>
                  <td class="mobile-stack-right" align="right" style="vertical-align: middle;">
                    <span style="display: inline-block; background-color: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 11px; font-weight: 700; padding: 5px 12px; border-radius: 20px; border: 1px solid rgba(52, 211, 153, 0.4); text-transform: uppercase; letter-spacing: 0.5px;">
                      &bull; Message Received
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY CONTENT -->
          <tr>
            <td class="mobile-p" style="padding: 36px 32px 28px 32px;">

              <!-- Badge -->
              <div style="font-size: 11px; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px;">
                OFFICIAL EXECUTIVE ACKNOWLEDGMENT
              </div>

              <!-- Headline -->
              <h1 style="margin: 0 0 18px 0; font-size: 24px; font-weight: 800; color: #f8fafc; line-height: 1.35; letter-spacing: -0.4px;">
                Thank you for contacting Aira Group of Technology
              </h1>

              <!-- Greeting -->
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #94a3b8; line-height: 1.6;">
                Dear <strong style="color: #f1f5f9;">[Name / Valued Contact]</strong>,
              </p>

              <!-- Main Copy -->
              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.7; color: #cbd5e1;">
                Thank you for reaching out to Aira Group of Technology. Your communication has been safely received and registered in our central intake dispatch.
              </p>

              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.7; color: #cbd5e1;">
                Your message is directly routed to the executive office of Founder &amp; Chief Executive Officer <strong style="color: #f8fafc;">Er. Adam Eehan</strong> and Co-Founder <strong style="color: #f8fafc;">Anandhakrishnan H</strong>.
              </p>

              <!-- WHAT HAPPENS NEXT CALLOUT BOX -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #081324; border-left: 4px solid #38bdf8; border-top: 1px solid #172a45; border-right: 1px solid #172a45; border-bottom: 1px solid #172a45; border-radius: 8px; margin: 24px 0;">
                <tr>
                  <td style="padding: 20px 22px;">
                    <div style="font-size: 14px; font-weight: 800; color: #38bdf8; margin-bottom: 6px; letter-spacing: 0.3px; display: flex; align-items: center; gap: 6px;">
                      What happens next?
                    </div>
                    <p style="margin: 0; font-size: 14px; line-height: 1.65; color: #e2e8f0;">
                      Our executive leadership team will review your inquiry and respond within <strong style="color: #38bdf8;">24 business hours</strong>.
                    </p>
                    <div style="margin-top: 10px; font-size: 12.5px; line-height: 1.5; color: #94a3b8;">
                      For immediate technical overviews or real-time assistance, our sovereign AI co-pilot (<strong style="color: #a78bfa;">Aira 3 Ultra</strong>) is active 24/7 on our website desk.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Portal Explorer Invitation -->
              <p style="margin: 20px 0 16px 0; font-size: 14.5px; line-height: 1.6; color: #94a3b8;">
                To explore our sovereign AI research, enterprise engineering suites, and leadership portfolio, please visit our official digital portal:
              </p>

              <!-- CTA BUTTON -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding: 10px 0 28px 0;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://airaaigroup.in" style="height:46px;v-text-anchor:middle;width:240px;" arcsize="50%" stroke="f" fillcolor="#2563eb">
                      <w:anchorlock/>
                      <center style="color:#ffffff;font-family:sans-serif;font-size:14px;font-weight:bold;">Visit Official Portal &rarr;</center>
                    </v:roundrect>
                    <![endif]-->
                    <a href="https://airaaigroup.in" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); background-color: #2563eb; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 13px 32px; border-radius: 50px; box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35); border: 1px solid #3b82f6;">
                      Visit Official Portal &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <hr style="border: none; border-top: 1px solid #162842; margin: 0 0 24px 0;">

              <!-- SIGNATURE BLOCK -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align: top;">
                    <div style="font-size: 13px; color: #94a3b8; margin-bottom: 4px;">Warm regards,</div>
                    <div style="font-size: 16px; font-weight: 800; color: #f8fafc; letter-spacing: -0.2px;">
                      Executive Operations
                    </div>
                    <div style="font-size: 13px; font-weight: 600; color: #38bdf8; margin-top: 2px;">
                      Aira Group of Technology
                    </div>
                    <div style="font-size: 12.5px; color: #94a3b8; margin-top: 4px; line-height: 1.5;">
                      Technopark, Trivandrum, Kerala, India<br>
                      <a href="mailto:contact@airaaigroup.in" style="color: #38bdf8; text-decoration: none;">contact@airaaigroup.in</a>
                      &nbsp;&bull;&nbsp;
                      <a href="mailto:me@airaaigroup.in" style="color: #38bdf8; text-decoration: none;">me@airaaigroup.in</a>
                      &nbsp;&bull;&nbsp;
                      <a href="https://airaaigroup.in" style="color: #60a5fa; text-decoration: none;">airaaigroup.in</a>
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td class="mobile-p" style="background-color: #08111e; padding: 24px 32px; border-top: 1px solid #132238;">
              <p style="margin: 0 0 10px 0; font-size: 12px; line-height: 1.55; color: #64748b;">
                <strong>Notice:</strong> This is an automated acknowledgment dispatch. Please do not reply directly to this notice. For additional inquiries or follow-ups, write to <a href="mailto:contact@airaaigroup.in" style="color: #38bdf8; text-decoration: none;">contact@airaaigroup.in</a>.
              </p>
              <p style="margin: 0 0 10px 0; font-size: 11.5px; color: #64748b; line-height: 1.5;">
                Aira Group of Technology &nbsp;&bull;&nbsp; Technopark, Thiruvananthapuram, Kerala, India &nbsp;&bull;&nbsp;
                <a href="https://airaaigroup.in/privacy" style="color: #94a3b8; text-decoration: none;">Privacy Policy</a>
              </p>
              <p style="margin: 0; font-size: 11.5px; color: #475569;">
                &copy; 2026 Aira Group of Technology. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
        <!-- End Main Card -->

      </td>
    </tr>
  </table>

</body>
</html>
`;
  return tpl.replace('[Name / Valued Contact]', safeName);
}
