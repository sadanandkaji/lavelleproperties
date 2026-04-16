import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ── Types ──────────────────────────────────────────────────────────────────────
interface SingleBooking {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  propertyTitle: string;
  propertyId?: string;
}

interface MultiBooking {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  properties: { id?: string; title: string; location?: string; price?: number; callForPrice?: boolean }[];
}

type BookingBody = SingleBooking | MultiBooking;

function isMulti(body: BookingBody): body is MultiBooking {
  return Array.isArray((body as MultiBooking).properties) &&
    (body as MultiBooking).properties.length > 0;
}

function formatINRPrice(price?: number, callForPrice?: boolean): string {
  if (callForPrice || !price) return "Call for Price";
  if (price >= 1_00_00_000) {
    const v = price / 1_00_00_000;
    return `₹${v % 1 === 0 ? v : v.toFixed(2)}C`;
  }
  if (price >= 1_00_000) {
    const v = price / 1_00_000;
    return `₹${v % 1 === 0 ? v : v.toFixed(2)}L`;
  }
  if (price >= 1_000) {
    const v = price / 1_000;
    return `₹${v % 1 === 0 ? v : v.toFixed(1)}K`;
  }
  return `₹${price}`;
}

export async function POST(req: NextRequest) {
  try {
    const body: BookingBody = await req.json();
    const { name, email, phone, date, time } = body;

    // ── Validate ───────────────────────────────────────────────────────────────
    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const multi = isMulti(body);

    // Normalise to a properties array for unified logic
    const properties = multi
      ? body.properties
      : [{ id: (body as SingleBooking).propertyId, title: (body as SingleBooking).propertyTitle }];

    if (!properties.length || !properties[0].title) {
      return NextResponse.json({ error: 'No property information provided' }, { status: 400 });
    }

    // ── Format date ────────────────────────────────────────────────────────────
    const [year, month, day] = date.split("-").map(Number);
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    // ── Transporter ────────────────────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ── Shared property rows HTML ──────────────────────────────────────────────
    const propertyRowsHTML = properties.map((p, i) => `
      <tr>
        <td style="padding:${i === 0 ? '0' : '12px 0 0'};vertical-align:top;">
          <div style="background:#ffffff08;border:1px solid #ffffff0a;border-radius:14px;padding:14px 18px;display:flex;align-items:flex-start;gap:12px;">
            <div style="width:26px;height:26px;border-radius:50%;background:#d4af3722;border:1px solid #d4af3744;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:11px;font-weight:900;color:#d4af37;text-align:center;line-height:26px;">
              ${i + 1}
            </div>
            <div style="flex:1;min-width:0;">
              <p style="margin:0;font-size:14px;font-weight:800;color:#ffffff;line-height:1.3;">${p.title}</p>
              ${p.location ? `<p style="margin:4px 0 0;font-size:11px;color:#888;">📍 ${p.location}</p>` : ''}
              ${p.price || p.callForPrice ? `<p style="margin:6px 0 0;font-size:12px;font-weight:700;color:#d4af37;">${formatINRPrice(p.price, p.callForPrice)}</p>` : ''}
              ${p.id ? `<p style="margin:4px 0 0;font-size:10px;color:#444;font-family:monospace;">ID: ${p.id}</p>` : ''}
            </div>
          </div>
        </td>
      </tr>
    `).join('');

    // ── Property summary chips for client email header ─────────────────────────
    const propertySummaryChips = properties.map(p => `
      <span style="display:inline-block;background:#d4af3715;border:1px solid #d4af3744;border-radius:999px;padding:4px 12px;font-size:10px;font-weight:700;color:#d4af37;margin:3px;white-space:nowrap;max-width:200px;overflow:hidden;text-overflow:ellipsis;">
        ${p.title}
      </span>
    `).join('');

    const countLabel = properties.length === 1
      ? `1 property`
      : `${properties.length} properties`;

    // ══════════════════════════════════════════════════════════════════════════
    //  ADMIN NOTIFICATION EMAIL
    // ══════════════════════════════════════════════════════════════════════════
    const adminSubject = properties.length === 1
      ? `📅 New Site Visit Booked — ${properties[0].title}`
      : `📅 ${properties.length} Site Visits Booked — ${name}`;

    const adminHTML = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" /></head>
      <body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#111111;border-radius:24px;border:1px solid #d4af3733;overflow:hidden;max-width:600px;width:100%;">

              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#1a1500,#2a2000);padding:40px 40px 30px;text-align:center;border-bottom:1px solid #d4af3722;">
                  <p style="margin:0 0 8px;font-size:10px;letter-spacing:6px;text-transform:uppercase;color:#c5a059;font-weight:700;">Lavelle Venture</p>
                  <h1 style="margin:0;font-size:26px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">
                    ${properties.length === 1 ? 'New Visit Scheduled' : `${properties.length} Visits Scheduled`}
                  </h1>
                  <div style="margin:16px auto 0;height:1px;width:60px;background:linear-gradient(90deg,transparent,#d4af37,transparent);"></div>
                </td>
              </tr>

              <!-- Visit Info -->
              <tr>
                <td style="padding:28px 40px 0;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding-bottom:0;width:50%;">
                        <div style="background:#ffffff08;border:1px solid #ffffff0a;border-radius:14px;padding:14px 16px;">
                          <p style="margin:0 0 4px;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#555;font-weight:700;">Date</p>
                          <p style="margin:0;font-size:13px;font-weight:700;color:#fff;">${formattedDate}</p>
                        </div>
                      </td>
                      <td style="padding-bottom:0;padding-left:12px;width:50%;">
                        <div style="background:#ffffff08;border:1px solid #ffffff0a;border-radius:14px;padding:14px 16px;">
                          <p style="margin:0 0 4px;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#555;font-weight:700;">Time</p>
                          <p style="margin:0;font-size:13px;font-weight:700;color:#d4af37;">${time}</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Properties -->
              <tr>
                <td style="padding:24px 40px 0;">
                  <p style="margin:0 0 14px;font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#c5a059;font-weight:700;">
                    ${properties.length === 1 ? 'Property' : `Properties (${properties.length})`}
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    ${propertyRowsHTML}
                  </table>
                </td>
              </tr>

              <!-- Client Details -->
              <tr>
                <td style="padding:24px 40px 0;">
                  <p style="margin:0 0 14px;font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#c5a059;font-weight:700;">Client Details</p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff05;border:1px solid #ffffff08;border-radius:16px;overflow:hidden;">
                    ${[
                      { label: 'Full Name', value: name,  emoji: '👤' },
                      { label: 'Email',     value: email, emoji: '📧' },
                      { label: 'Phone',     value: phone, emoji: '📞' },
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
                    Automated notification · Lavelle Venture Booking System
                  </p>
                </td>
              </tr>

            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `;

    // ══════════════════════════════════════════════════════════════════════════
    //  CLIENT CONFIRMATION EMAIL
    // ══════════════════════════════════════════════════════════════════════════
    const clientSubject = properties.length === 1
      ? `Your Visit is Confirmed — ${properties[0].title}`
      : `${properties.length} Site Visits Confirmed — Lavelle Venture`;

    const clientHTML = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" /></head>
      <body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#111111;border-radius:24px;border:1px solid #d4af3733;overflow:hidden;max-width:600px;width:100%;">

              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#1a1500,#2a2000);padding:48px 40px 36px;text-align:center;border-bottom:1px solid #d4af3722;">
                  <p style="margin:0 0 8px;font-size:10px;letter-spacing:6px;text-transform:uppercase;color:#c5a059;font-weight:700;">Lavelle Venture</p>
                  <h1 style="margin:0;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">
                    ${properties.length === 1 ? 'Visit Confirmed!' : `${properties.length} Visits Confirmed!`}
                  </h1>
                  <p style="margin:12px 0 0;font-size:13px;color:#888;">
                    Hello ${name}, your ${countLabel} ${properties.length === 1 ? 'has' : 'have'} been scheduled.
                  </p>
                  ${properties.length > 1 ? `
                  <div style="margin-top:16px;text-align:center;">
                    ${propertySummaryChips}
                  </div>` : ''}
                </td>
              </tr>

              <!-- Booking Summary Card -->
              <tr>
                <td style="padding:32px 40px 0;">
                  <div style="background:#d4af3711;border:1px solid #d4af3733;border-radius:20px;padding:24px;">
                    <p style="margin:0 0 18px;font-size:9px;letter-spacing:5px;text-transform:uppercase;color:#c5a059;font-weight:700;text-align:center;">
                      Booking Summary
                    </p>

                    <!-- Date & Time -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:18px;">
                      <tr>
                        <td style="width:50%;padding-right:6px;">
                          <div style="background:#ffffff08;border-radius:12px;padding:12px 14px;">
                            <p style="margin:0 0 3px;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#666;font-weight:700;">Date</p>
                            <p style="margin:0;font-size:12px;font-weight:700;color:#fff;">${formattedDate}</p>
                          </div>
                        </td>
                        <td style="width:50%;padding-left:6px;">
                          <div style="background:#ffffff08;border-radius:12px;padding:12px 14px;">
                            <p style="margin:0 0 3px;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#666;font-weight:700;">Time</p>
                            <p style="margin:0;font-size:13px;font-weight:800;color:#d4af37;">${time}</p>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Contact info -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${[
                        { label: 'Name',  value: name  },
                        { label: 'Phone', value: phone },
                      ].map((row, i) => `
                        <tr>
                          <td style="padding:${i > 0 ? '8px 0 0' : '0'};width:38%;vertical-align:top;">
                            <p style="margin:0;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#666;font-weight:700;">${row.label}</p>
                          </td>
                          <td style="padding:${i > 0 ? '8px 0 0' : '0'};vertical-align:top;text-align:right;">
                            <p style="margin:0;font-size:13px;font-weight:700;color:#ffffff;">${row.value}</p>
                          </td>
                        </tr>
                      `).join('')}
                    </table>
                  </div>
                </td>
              </tr>

              <!-- Properties being visited -->
              <tr>
                <td style="padding:24px 40px 0;">
                  <p style="margin:0 0 14px;font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#c5a059;font-weight:700;">
                    ${properties.length === 1 ? 'Property to Visit' : `Properties to Visit (${properties.length})`}
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    ${propertyRowsHTML}
                  </table>
                </td>
              </tr>

              <!-- What to Expect -->
              <tr>
                <td style="padding:28px 40px 0;">
                  <p style="margin:0 0 14px;font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#c5a059;font-weight:700;">What to Expect</p>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    ${[
                      { icon: '📞', text: 'Our advisor will call you 30 minutes before your visit.' },
                      { icon: '🏠', text: properties.length === 1
                          ? 'A dedicated property expert will guide your walkthrough.'
                          : `A dedicated advisor will guide you through all ${properties.length} properties.` },
                      { icon: '📋', text: 'Feel free to ask any questions about the properties or pricing.' },
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

              <!-- Contact -->
              <tr>
                <td style="padding:20px 40px 0;">
                  <div style="background:#ffffff05;border:1px solid #ffffff08;border-radius:16px;padding:16px 20px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:10px;color:#555;">Need to reschedule or have questions?</p>
                    <a href="mailto:lavelleventure@gmail.com" style="color:#d4af37;font-weight:700;font-size:13px;text-decoration:none;">
                      lavelleventure@gmail.com
                    </a>
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
          </td></tr>
        </table>
      </body>
      </html>
    `;

    // ── Send both emails ───────────────────────────────────────────────────────
    await Promise.all([
      transporter.sendMail({
        from:    `"Lavelle Venture Bookings" <${process.env.EMAIL_USER}>`,
        to:      'lavelleventure@gmail.com',
        subject: adminSubject,
        html:    adminHTML,
      }),
      transporter.sendMail({
        from:    `"Lavelle Venture" <${process.env.EMAIL_USER}>`,
        to:      email,
        subject: clientSubject,
        html:    clientHTML,
      }),
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