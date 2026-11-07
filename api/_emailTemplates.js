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
            <td style="background-color: #0a2342; padding: 26px 32px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <div style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                      Aira<span style="color: #60a5fa;">Group</span>
                    </div>
                    <div style="font-size: 9px; font-weight: 700; color: #93c5fd; letter-spacing: 2px; text-transform: uppercase; margin-top: 3px;">
                      TECHNOLOGY • SOVEREIGN ENGINEERING
                    </div>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; font-weight: 600; color: #cbd5e1; border: 1px solid rgba(255, 255, 255, 0.2); padding: 4px 10px; border-radius: 6px;">
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
              <div style="font-size: 12px; font-weight: 700; color: #1d4ed8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                SUBSCRIPTION CONFIRMATION
              </div>
              <h1 style="margin: 0 0 16px; font-size: 24px; font-weight: 800; color: #0a2342; line-height: 1.3;">
                Confirm Your Subscription to Aira Group Dispatches
              </h1>
              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #334155;">
                Hello <strong>${safeName}</strong>,
              </p>
              <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6; color: #475569;">
                Thank you for requesting to join the official <strong>Aira Group of Technology</strong> engineering dispatch list. We publish verified deep-tech architectural analyses on sovereign AI models, bare-metal kernels, and cellular mesh communication directly from Founder &amp; CEO Er. Adam Eehan.
              </p>
              <p style="margin: 0 0 28px; font-size: 15px; line-height: 1.6; color: #475569;">
                To complete your subscription and verify that this email belongs to you, please click the button below:
              </p>
              <!-- Action Button -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td align="center">
                    <a href="${safeUrl}" target="_blank" style="display: inline-block; background-color: #1d4ed8; color: #ffffff; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px; box-shadow: 0 2px 10px rgba(29, 78, 216, 0.3);">
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
                🔒 If you did not request this subscription, no action is required. You will never be added without explicit confirmation.
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
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Aira Group — Sovereign Engineering</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
  <div style="display: none; font-size: 1px; color: #f1f5f9; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Your subscription is confirmed. Welcome to Aira Group of Technology — Sovereign Engineering. Zero Dependency.
  </div>
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(10, 35, 66, 0.05);">
          <!-- Top Header -->
          <tr>
            <td style="background-color: #0a2342; padding: 26px 32px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <div style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                      Aira<span style="color: #60a5fa;">Group</span>
                    </div>
                    <div style="font-size: 9px; font-weight: 700; color: #93c5fd; letter-spacing: 2px; text-transform: uppercase; margin-top: 3px;">
                      TECHNOLOGY • SOVEREIGN ENGINEERING
                    </div>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; font-weight: 600; color: #34d399; background-color: rgba(16, 185, 129, 0.15); border: 1px solid rgba(52, 211, 153, 0.4); padding: 4px 10px; border-radius: 6px;">
                      ✓ Verified Member
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 36px 32px 28px;">
              <div style="font-size: 12px; font-weight: 700; color: #1d4ed8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                OFFICIAL WELCOME
              </div>
              <h1 style="margin: 0 0 16px; font-size: 24px; font-weight: 800; color: #0a2342; line-height: 1.3;">
                Sovereign Engineering.<br/>Zero Dependency.
              </h1>
              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #334155;">
                Hello <strong>${safeName}</strong>,
              </p>
              <p style="margin: 0 0 18px; font-size: 15px; line-height: 1.6; color: #475569;">
                Welcome to <strong>Aira Group of Technology</strong>. We don't just build consumer software; we engineer deep-tech sovereignty from the bare metal up.
              </p>
              <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #475569;">
                As a confirmed subscriber to our Dispatches, you get direct, early insights into our active research and open deployments:
              </p>

              <!-- Feature Highlights -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td style="padding: 14px 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="32" valign="top" style="font-size: 18px;">⚡</td>
                        <td style="padding-left: 10px;">
                          <div style="font-size: 14px; font-weight: 700; color: #0a2342;">Aira Sovereign Models Hub</div>
                          <div style="font-size: 12px; color: #64748b; margin-top: 2px;">
                            Zero rate-limit OpenAI-compatible AI API gateway and interactive playground.
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td height="10"></td></tr>
                <tr>
                  <td style="padding: 14px 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="32" valign="top" style="font-size: 18px;">🌐</td>
                        <td style="padding-left: 10px;">
                          <div style="font-size: 14px; font-weight: 700; color: #0a2342;">AiraLang &amp; Bare-Metal Kernel</div>
                          <div style="font-size: 12px; color: #64748b; margin-top: 2px;">
                            High-performance SIMD execution engine engineered without foreign frameworks.
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td height="10"></td></tr>
                <tr>
                  <td style="padding: 14px 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="32" valign="top" style="font-size: 18px;">📡</td>
                        <td style="padding-left: 10px;">
                          <div style="font-size: 14px; font-weight: 700; color: #0a2342;">Cellular Mesh &amp; Hardened Comms</div>
                          <div style="font-size: 12px; color: #64748b; margin-top: 2px;">
                            Decentralized off-grid mesh protocols for mission-critical infrastructure.
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Action Button -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td align="center">
                    <a href="https://www.airaaigroup.in" target="_blank" style="display: inline-block; background-color: #1d4ed8; color: #ffffff; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px; box-shadow: 0 2px 10px rgba(29, 78, 216, 0.3);">
                      Explore Aira Ecosystem &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
                <p style="margin: 0; font-size: 14px; font-weight: 700; color: #0a2342;">
                  Er. Adam Eehan
                </p>
                <p style="margin: 2px 0 0; font-size: 12px; color: #64748b;">
                  Founder &amp; CEO, Aira Group of Technology
                </p>
              </div>
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

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
