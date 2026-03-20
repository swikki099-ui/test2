import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Server-side validation
    const requiredFields = ["fullName", "email", "whatsapp", "country", "address", "projects", "github", "experience", "linkedin", "portfolio"];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ success: false, message: `Field ${field} is required` }, { status: 400 });
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 });
    }

    // Configure the SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Define Email Options
    const mailOptions = {
      from: `"NeroDev Community" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `⚡ New NeroDev Registration: ${data.fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0; }
              .header { background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%); padding: 40px 20px; text-align: center; color: white; }
              .logo { width: 48px; height: 48px; background: white; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-weight: 900; color: #4f46e5; font-size: 20px; margin-bottom: 16px; }
              .content { padding: 40px 30px; background: white; }
              .section-title { font-size: 14px; font-weight: 900; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin: 30px 0 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; }
              .data-row { margin-bottom: 20px; }
              .label { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px; }
              .value { font-size: 16px; font-weight: 600; color: #1e293b; line-height: 1.5; }
              .link { color: #4f46e5; text-decoration: none; font-weight: 700; }
              .footer { padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; background-color: #f8fafc; border-top: 1px solid #e2e8f0; }
              .badge { display: inline-block; padding: 4px 12px; border-radius: 99px; background: #e0e7ff; color: #4338ca; font-size: 12px; font-weight: 700; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">ND</div>
                <h1 style="margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.02em;">New Pioneer Joined</h1>
                <p style="margin: 8px 0 0; opacity: 0.9; font-weight: 500;">A new member has registered for NeroDev.</p>
              </div>
              
              <div class="content">
                <div class="section-title">Basic Information</div>
                <div class="data-row">
                  <div class="label">Full Name</div>
                  <div class="value">${data.fullName}</div>
                </div>
                <div class="data-row">
                  <div class="label">Email Address</div>
                  <div class="value"><a href="mailto:${data.email}" class="link">${data.email}</a></div>
                </div>
                <div class="data-row">
                  <div class="label">WhatsApp Number</div>
                  <div class="value">${data.whatsapp}</div>
                </div>
                <div class="data-row">
                  <div class="label">Location</div>
                  <div class="value">${data.country} — ${data.address}</div>
                </div>

                <div class="section-title">Professional Profile</div>
                <div class="data-row">
                  <div class="label">Experience Level</div>
                  <div class="value"><span class="badge">${data.experience}</span></div>
                </div>
                <div class="data-row">
                  <div class="label">Projects Summary</div>
                  <div class="value" style="background: #f1f5f9; padding: 15px; border-radius: 12px; font-weight: 500;">${data.projects}</div>
                </div>
                <div class="data-row">
                  <div class="label">GitHub Profile</div>
                  <div class="value"><a href="${data.github}" class="link" target="_blank">${data.github}</a></div>
                </div>
                <div class="data-row">
                  <div class="label">LinkedIn Profile</div>
                  <div class="value"><a href="${data.linkedin}" class="link" target="_blank">${data.linkedin}</a></div>
                </div>
                <div class="data-row">
                  <div class="label">Portfolio Link</div>
                  <div class="value"><a href="${data.portfolio}" class="link" target="_blank">${data.portfolio}</a></div>
                </div>
              </div>

              <div class="footer">
                &copy; ${new Date().getFullYear()} NeroDev Community Infrastructure<br>
                Automated System Alert — Please respond within 24 hours.
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Registration successful" });
  } catch (error: any) {
    console.error("Nodemailer Error Details:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      stack: error.stack
    });
    return NextResponse.json({ 
      success: false, 
      message: "Failed to send email. Please check server logs for details.",
      error: error.message 
    }, { status: 500 });
  }
}
