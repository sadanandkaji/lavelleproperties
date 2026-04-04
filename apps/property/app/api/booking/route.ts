import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, date, time, propertyTitle, propertyId } = body;

    // ── Validate required fields ───────────────────────────────────────────────
    if (!name || !email || !phone || !date || !time || !propertyTitle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // ── Nodemailer transporter (Gmail SMTP) ────────────────────────────────────
    // Set these in your .env.local:
    //   EMAIL_USER=lavelleventure@gmail.com
    //   EMAIL_PASS=your_16_char_app_password   ← generate at myaccount.google.com/apppasswords
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,  // Gmail App Password (not your login password)
      },
    });

    const formattedDate = new Date(date).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // ── Email to YOU (admin notification) ─────────────────────────────────────
    const adminMailOptions = {
      from: `"Lavelle Venture Bookings" <${process.env.EMAIL_USER}>`,
      to: 'lavelleventure@gmail.com',
      subject: `📅 New Site Visit Booked — ${propertyTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#111111;border-radius:24px;border:1px solid #d4af3733;overflow:hidden;max-width:600px;width:100%;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#1a1500,#2a2000);padding:40px 40px 30px;text-align:center;border-bottom:1px solid #d4af3722;">
                      <p style="margin:0 0 8px;font-size:10px;letter-spacing:6px;text-transform:uppercase;color:#c5a059;font-weight:700;">
                        Lavelle Venture
                      </p>
                      <h1 style="margin:0;font-size:26px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">
                        New Visit Scheduled
                      </h1>
                      <div style="margin:16px auto 0;height:1px;width:60px;background:linear-gradient(90deg,transparent,#d4af37,transparent);"></div>
                    </td>
                  </tr>

                  <!-- Property Badge -->
                  <tr>
                    <td style="padding:28px 40px 0;">
                      <div style="background:#d4af3711;border:1px solid #d4af3733;border-radius:16px;padding:16px 20px;display:flex;align-items:center;">
                        <div>
                          <p style="margin:0 0 4px;font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#888;font-weight:700;">Property</p>
                          <p style="margin:0;font-size:16px;font-weight:900;color:#d4af37;">${propertyTitle}</p>
                          ${propertyId ? `<p style="margin:4px 0 0;font-size:11px;color:#555;font-family:monospace;">ID: ${propertyId}</p>` : ''}
                        </div>
                      </div>
                    </td>
                  </tr>

                  <!-- Visit Details -->
                  <tr>
                    <td style="padding:24px 40px 0;">
                      <p style="margin:0 0 14px;font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#c5a059;font-weight:700;">Visit Details</p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-bottom:12px;width:50%;">
                            <div style="background:#ffffff08;border:1px solid #ffffff0a;border-radius:14px;padding:14px 16px;">
                              <p style="margin:0 0 4px;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#555;font-weight:700;">Date</p>
                              <p style="margin:0;font-size:13px;font-weight:700;color:#fff;">${formattedDate}</p>
                            </div>
                          </td>
                          <td style="padding-bottom:12px;padding-left:12px;width:50%;">
                            <div style="background:#ffffff08;border:1px solid #ffffff0a;border-radius:14px;padding:14px 16px;">
                              <p style="margin:0 0 4px;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#555;font-weight:700;">Time</p>
                              <p style="margin:0;font-size:13px;font-weight:700;color:#d4af37;">${time}</p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Client Details -->
                  <tr>
                    <td style="padding:8px 40px 0;">
                      <p style="margin:0 0 14px;font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#c5a059;font-weight:700;">Client Details</p>
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff05;border:1px solid #ffffff08;border-radius:16px;overflow:hidden;">
                        ${[
                          { label: 'Full Name', value: name, emoji: '👤' },
                          { label: 'Email', value: email, emoji: '📧' },
                          { label: 'Phone', value: phone, emoji: '📞' },
                        ].map((row, i) => `
                          <tr style="${i > 0 ? 'border-top:1px solid #ffffff08;' : ''}">
                            <td style="padding:14px 20px;">
                              <table cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="font-size:14px;padding-right:12px;">${row.emoji}</td>
                                  <td>
                                    <p style="margin:0 0 2px;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#555;font-weight:700;">${row.label}</p>
                                    <p style="margin:0;font-size:13px;font-weight:600;color:#fff;">${row.value}</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        `).join('')}
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:32px 40px 40px;text-align:center;">
                      <div style="height:1px;background:linear-gradient(90deg,transparent,#d4af3733,transparent);margin-bottom:24px;"></div>
                      <p style="margin:0;font-size:11px;color:#444;letter-spacing:1px;">
                        This is an automated notification from your Lavelle Venture booking system.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // ── Confirmation email to CLIENT ───────────────────────────────────────────
    const clientMailOptions = {
      from: `"Lavelle Venture" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Your Visit is Confirmed — ${propertyTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#111111;border-radius:24px;border:1px solid #d4af3733;overflow:hidden;max-width:600px;width:100%;">

                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#1a1500,#2a2000);padding:48px 40px 36px;text-align:center;border-bottom:1px solid #d4af3722;">
                      <!-- Checkmark -->
                      <div style="width:64px;height:64px;border-radius:50%;background:#d4af3722;border:1px solid #d4af37;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;line-height:64px;font-size:28px;">
                        ✓
                      </div>
                      <p style="margin:0 0 8px;font-size:10px;letter-spacing:6px;text-transform:uppercase;color:#c5a059;font-weight:700;">
                        Lavelle Venture
                      </p>
                      <h1 style="margin:0;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">
                        Visit Confirmed!
                      </h1>
                      <p style="margin:12px 0 0;font-size:13px;color:#888;">
                        Hello ${name}, your site visit has been scheduled.
                      </p>
                    </td>
                  </tr>

                  <!-- Summary Card -->
                  <tr>
                    <td style="padding:32px 40px 0;">
                      <div style="background:#d4af3711;border:1px solid #d4af3733;border-radius:20px;padding:24px;">
                        <p style="margin:0 0 16px;font-size:9px;letter-spacing:5px;text-transform:uppercase;color:#c5a059;font-weight:700;text-align:center;">Your Booking Summary</p>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          ${[
                            { label: 'Property', value: propertyTitle },
                            { label: 'Date', value: formattedDate },
                            { label: 'Time', value: time },
                            { label: 'Name', value: name },
                            { label: 'Phone', value: phone },
                          ].map((row, i) => `
                            <tr>
                              <td style="padding:${i > 0 ? '10px 0 0' : '0'};vertical-align:top;width:35%;">
                                <p style="margin:0;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#666;font-weight:700;">${row.label}</p>
                              </td>
                              <td style="padding:${i > 0 ? '10px 0 0' : '0'};vertical-align:top;">
                                <p style="margin:0;font-size:13px;font-weight:700;color:#ffffff;text-align:right;">${row.value}</p>
                              </td>
                            </tr>
                          `).join('')}
                        </table>
                      </div>
                    </td>
                  </tr>

                  <!-- What to Expect -->
                  <tr>
                    <td style="padding:28px 40px 0;">
                      <p style="margin:0 0 14px;font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#c5a059;font-weight:700;">What to Expect</p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        ${[
                          { icon: '📞', text: 'Our advisor will call you 30 minutes before your visit.' },
                          { icon: '🏠', text: 'A dedicated property expert will guide your walkthrough.' },
                          { icon: '📋', text: 'Feel free to ask any questions about the property or pricing.' },
                        ].map(({ icon, text }) => `
                          <tr>
                            <td style="padding-bottom:12px;vertical-align:top;width:36px;font-size:16px;">${icon}</td>
                            <td style="padding-bottom:12px;padding-left:12px;vertical-align:top;">
                              <p style="margin:0;font-size:12px;color:#888;line-height:1.7;">${text}</p>
                            </td>
                          </tr>
                        `).join('')}
                      </table>
                    </td>
                  </tr>

                  <!-- Contact Us -->
                  <tr>
                    <td style="padding:20px 40px 0;">
                      <div style="background:#ffffff05;border:1px solid #ffffff08;border-radius:16px;padding:16px 20px;text-align:center;">
                        <p style="margin:0 0 4px;font-size:10px;color:#555;">Need to reschedule or have questions?</p>
                        <a href="mailto:lavelleventure@gmail.com" style="color:#d4af37;font-weight:700;font-size:13px;text-decoration:none;">lavelleventure@gmail.com</a>
                      </div>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:32px 40px 40px;text-align:center;">
                      <div style="height:1px;background:linear-gradient(90deg,transparent,#d4af3733,transparent);margin-bottom:24px;"></div>
                      <p style="margin:0 0 6px;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#333;font-weight:700;">Lavelle Venture</p>
                      <p style="margin:0;font-size:11px;color:#333;">Curated Real Estate</p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // ── Send both emails ───────────────────────────────────────────────────────
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    return NextResponse.json(
      { success: true, message: 'Booking confirmed and emails sent.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Failed to send booking confirmation.' },
      { status: 500 }
    );
  }
}