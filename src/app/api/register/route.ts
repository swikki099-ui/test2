import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

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
      from: `"NeuroDev.in Registration" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER, // Send to yourself or admin
      subject: `New Registration: ${data.fullName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4f46e5;">New Registration Received</h2>
          <hr />
          <h3>Basic Information</h3>
          <p><strong>Full Name:</strong> ${data.fullName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
          <p><strong>Country:</strong> ${data.country}</p>
          <p><strong>Address:</strong> ${data.address}</p>
          <hr />
          <h3>Required/Professional Information</h3>
          <p><strong>Projects:</strong> ${data.projects}</p>
          <p><strong>GitHub:</strong> ${data.github}</p>
          <p><strong>Experience:</strong> ${data.experience}</p>
          <p><strong>LinkedIn:</strong> ${data.linkedin}</p>
          <p><strong>Portfolio:</strong> ${data.portfolio}</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
  }
}
