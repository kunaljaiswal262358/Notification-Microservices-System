import nodemailer from "nodemailer";

let transport;
export async function sendEmail({ to, subject, body }) {
  const html = `<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f7; padding:40px 0;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:18px;">
        <tr>
          <td style="padding:48px 44px; font-family:-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:17px; line-height:1.55; color:#1d1d1f;">

            ${body}

          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

  const info = await transport.sendMail({
    from: "From Kunal Notification System",
    to,
    subject,
    html,
  });
  console.log("UID: " + info.messageId);
  return info.messageId;
}

export async function createEmailTransport() {
  transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: true,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
}
