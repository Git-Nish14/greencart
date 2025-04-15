import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"GreenCart Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_RECEIVER,
      subject: "New Contact Message from GreenCart",
      html: getMailTemplate({ name, email, message }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

function getMailTemplate({ name, email, message }: any) {
  return `
    <div style="font-family:sans-serif; background:#f8fff8; padding:24px; border-radius:8px; border:1px solid #d1fadf;">
      <h2 style="color:#2f855a;">📬 New Inquiry from GreenCart</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap; background:#fff; padding:12px; border-radius:6px; border:1px solid #ccc;">${message}</p>
      <p style="margin-top:30px; font-size:12px; color:#999;">GreenCart – Powered by Freshness 🌿</p>
    </div>
  `;
}
