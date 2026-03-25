import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Create transporter once at module level — reused across all requests
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { nombre, email, mensaje } = await req.json();

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `Portfolio — Mensaje de ${nombre}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 20px; background: #080808; color: #F5F5F5; border: 1px solid #222222; border-radius: 8px;">
          <h2 style="color: #00E5FF; margin-top: 0;">Nuevo mensaje desde el portfolio</h2>
          <p><strong style="color: #888888;">De:</strong> ${nombre}</p>
          <p><strong style="color: #888888;">Email:</strong> <a href="mailto:${email}" style="color: #00E5FF;">${email}</a></p>
          <hr style="border-color: #222222; margin: 16px 0;" />
          <p><strong style="color: #888888;">Mensaje:</strong></p>
          <p style="color: #F5F5F5; line-height: 1.6;">${mensaje.replace(/\n/g, '<br>')}</p>
        </div>
      `,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error sending email:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
