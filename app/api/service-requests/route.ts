import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;
const adminEmail = process.env.ADMIN_EMAIL;

const allowedLanguages = ["ar", "en", "zh"] as const;
type Language = (typeof allowedLanguages)[number];

function createAdminClient() {
  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function emailShell({
  content,
  title,
  subtitle,
}: {
  content: string;
  title: string;
  subtitle: string;
}) {
  return `
    <div
      dir="rtl"
      lang="ar"
      style="
        margin:0;
        padding:40px 16px;
        background:#f4f1ec;
        font-family:Arial,Tahoma,sans-serif;
        color:#302c28;
      "
    >
      <div
        style="
          width:100%;
          max-width:700px;
          margin:0 auto;
        "
      >

        <!-- HEADER -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          dir="rtl"
          style="
            width:100%;
            background:#171717;
            border-radius:28px 28px 0 0;
            overflow:hidden;
          "
        >
          <tr>

            <!-- RIGHT: BRAND -->
            <td
              width="58%"
              valign="middle"
              align="right"
              style="
                padding:32px 20px 32px 8px;
                vertical-align:middle;
              "
            >
              <div
                style="
                  color:#ffffff;
                  font-family:Arial,Tahoma,sans-serif;
                  font-size:12px;
                  font-weight:bold;
                  letter-spacing:3px;
                  line-height:1.4;
                "
              >
                CHINA PLANET
              </div>

              <div
                style="
                  margin-top:8px;
                  color:#ffffff;
                  font-family:Arial,Tahoma,sans-serif;
                  font-size:24px;
                  font-weight:bold;
                  line-height:1.5;
                "
              >
                كوكب الصين
              </div>

              <div
                style="
                  margin-top:3px;
                  color:#aaa39c;
                  font-family:Arial,Tahoma,sans-serif;
                  font-size:11px;
                  line-height:1.5;
                "
              >
                China Planet
              </div>

              <div
                style="
                  margin-top:14px;
                  width:40px;
                  height:3px;
                  background:#c94a3d;
                  border-radius:99px;
                  font-size:1px;
                  line-height:3px;
                "
              >
                &nbsp;
              </div>
            </td>

            <!-- CENTER: LOGO -->
            <td
              width="42%"
              valign="middle"
              align="center"
              style="
                padding:24px 18px;
                vertical-align:middle;
                text-align:center;
              "
            >
              <img
                src="cid:china-planet-logo"
                alt="China Planet"
                width="105"
                style="
                  display:block;
                  width:105px;
                  max-width:105px;
                  height:auto;
                  margin:0 auto;
                  border:0;
                  outline:none;
                  text-decoration:none;
                "
              />
            </td>

          </tr>
        </table>

        </div>

        <!-- CONTENT -->
        <div
          style="
            background:#ffffff;
            padding:36px;
            border-left:1px solid #e4ddd5;
            border-right:1px solid #e4ddd5;
          "
        >

          ${content}

        </div>

        <!-- FOOTER -->
        <div
          style="
            background:#171717;
            border-radius:0 0 28px 28px;
            padding:26px 32px;
            text-align:center;
          "
        >
          <div
            style="
              color:#ffffff;
              font-size:14px;
              font-weight:bold;
            "
          >
            ${title}
          </div>

          <div
            style="
              margin-top:6px;
              color:#8f8983;
              font-size:11px;
            "
          >
            ${subtitle}
          </div>

          <div
            style="
              margin-top:16px;
              color:#77716c;
              font-size:10px;
              line-height:1.8;
            "
          >
            تم إنشاء هذا البريد تلقائيًا من موقع China Planet.
          </div>
        </div>

      </div>
    </div>
  `;
}

function requestRows({
  name,
  email,
  phone,
  service,
  language,
  details,
  requestId,
}: {
  name: string;
  email: string;
  phone: string;
  service: string;
  language: Language;
  details: string;
  requestId: string;
}) {
  return `
    <div
      style="
        border:1px solid #e5dfd8;
        border-radius:20px;
        overflow:hidden;
      "
    >
      <div
        style="
          padding:18px 20px;
          background:#f8f6f2;
          color:#554d46;
          font-size:13px;
          font-weight:bold;
        "
      >
        تفاصيل الطلب
      </div>

      <table
        dir="rtl"
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="
          border-collapse:collapse;
          font-size:14px;
        "
      >
        <tr>
          <td style="
            width:34%;
            padding:15px 20px;
            background:#fcfbf9;
            border-top:1px solid #eee8e2;
            color:#8a8179;
            font-weight:bold;
          ">
            الاسم
          </td>

          <td style="
            padding:15px 20px;
            border-top:1px solid #eee8e2;
            color:#302c28;
          ">
            ${escapeHtml(name)}
          </td>
        </tr>

        <tr>
          <td style="
            padding:15px 20px;
            background:#fcfbf9;
            border-top:1px solid #eee8e2;
            color:#8a8179;
            font-weight:bold;
          ">
            الخدمة
          </td>

          <td style="
            padding:15px 20px;
            border-top:1px solid #eee8e2;
            color:#c94a3d;
            font-weight:bold;
          ">
            ${escapeHtml(service)}
          </td>
        </tr>

        <tr>
          <td style="
            padding:15px 20px;
            background:#fcfbf9;
            border-top:1px solid #eee8e2;
            color:#8a8179;
            font-weight:bold;
          ">
            البريد الإلكتروني
          </td>

          <td style="
            padding:15px 20px;
            border-top:1px solid #eee8e2;
            color:#302c28;
          ">
            ${
              email
                ? escapeHtml(email)
                : "غير مضاف"
            }
          </td>
        </tr>

        <tr>
          <td style="
            padding:15px 20px;
            background:#fcfbf9;
            border-top:1px solid #eee8e2;
            color:#8a8179;
            font-weight:bold;
          ">
            رقم الجوال
          </td>

          <td style="
            padding:15px 20px;
            border-top:1px solid #eee8e2;
            color:#302c28;
          ">
            ${
              phone
                ? escapeHtml(phone)
                : "غير مضاف"
            }
          </td>
        </tr>

        <tr>
          <td style="
            padding:15px 20px;
            background:#fcfbf9;
            border-top:1px solid #eee8e2;
            color:#8a8179;
            font-weight:bold;
          ">
            اللغة
          </td>

          <td style="
            padding:15px 20px;
            border-top:1px solid #eee8e2;
            color:#302c28;
          ">
            ${escapeHtml(language.toUpperCase())}
          </td>
        </tr>

        <tr>
          <td style="
            padding:15px 20px;
            background:#fcfbf9;
            border-top:1px solid #eee8e2;
            color:#8a8179;
            font-weight:bold;
            vertical-align:top;
          ">
            التفاصيل
          </td>

          <td style="
            padding:15px 20px;
            border-top:1px solid #eee8e2;
            color:#302c28;
            line-height:1.9;
            white-space:pre-wrap;
          ">
            ${
              details
                ? escapeHtml(details)
                : "لا توجد تفاصيل إضافية."
            }
          </td>
        </tr>

        <tr>
          <td style="
            padding:15px 20px;
            background:#fcfbf9;
            border-top:1px solid #eee8e2;
            color:#8a8179;
            font-weight:bold;
          ">
            رقم الطلب
          </td>

          <td style="
            padding:15px 20px;
            border-top:1px solid #eee8e2;
            color:#302c28;
            font-size:12px;
          ">
            ${escapeHtml(requestId)}
          </td>
        </tr>
      </table>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    const admin = createAdminClient();

    if (!admin) {
      return NextResponse.json(
        {
          error: "Server configuration is missing.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const name = cleanText(body.name, 120);
    const email = cleanText(body.email, 160);
    const phone = cleanText(body.phone, 50);
    const service = cleanText(body.service, 160);
    const details = cleanText(body.details, 3000);
    const languageValue = cleanText(body.language, 10);

    const language: Language = allowedLanguages.includes(
      languageValue as Language
    )
      ? (languageValue as Language)
      : "ar";

    if (!name || !service) {
      return NextResponse.json(
        {
          error: "الاسم والخدمة مطلوبان.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await admin
      .from("service_requests")
      .insert({
        name,
        email: email || null,
        phone: phone || null,
        service,
        details: details || null,
        language,
        status: "new",
      })
      .select(
        "id, name, email, phone, service, details, language, status, created_at"
      )
      .single();

    if (error) {
      console.error("SERVICE REQUEST INSERT ERROR:", error);

      return NextResponse.json(
        {
          error: "تعذر حفظ طلب الخدمة.",
        },
        { status: 500 }
      );
    }

    let emailSent = false;

    if (resendApiKey && adminEmail) {
      try {
        const resend = new Resend(resendApiKey);

        const logoPath = path.join(
          process.cwd(),
          "public",
          "logo",
          "china-planet-logo.png"
        );

        const logoBuffer = await readFile(logoPath);

        const logoAttachment = {
          filename: "china-planet-logo.png",
          content: logoBuffer,
          contentId: "china-planet-logo",
        };

        // ============================
        // EMAIL TO ADMIN
        // ============================

        const adminContent = `
          <div
            style="
              text-align:center;
              margin-bottom:30px;
            "
          >
            <div
              style="
                display:inline-block;
                padding:8px 14px;
                background:#f8f6f2;
                border-radius:999px;
                color:#9a9087;
                font-size:10px;
                font-weight:bold;
                letter-spacing:2px;
              "
            >
              NEW SERVICE REQUEST
            </div>

            <h1
              style="
                margin:18px 0 8px;
                color:#171717;
                font-size:26px;
                line-height:1.5;
              "
            >
              طلب خدمة جديد
            </h1>

            <p
              style="
                margin:0;
                color:#8a8179;
                font-size:13px;
                line-height:1.8;
              "
            >
              وصل طلب جديد من نموذج التواصل في موقع كوكب الصين.
            </p>
          </div>

          ${requestRows({
            name,
            email,
            phone,
            service,
            language,
            details,
            requestId: String(data.id),
          })}

          ${
            email
              ? `
                <div
                  style="
                    margin-top:24px;
                    padding:18px 20px;
                    background:#f8f6f2;
                    border-radius:18px;
                    text-align:center;
                  "
                >
                  <div
                    style="
                      color:#554d46;
                      font-size:12px;
                      font-weight:bold;
                    "
                  >
                    يمكن الرد على العميل مباشرة عبر البريد الإلكتروني
                  </div>

                  <div
                    style="
                      margin-top:7px;
                      color:#c94a3d;
                      font-size:13px;
                    "
                  >
                    ${escapeHtml(email)}
                  </div>
                </div>
              `
              : ""
          }
        `;

        const result = await resend.emails.send({
          from: "China Planet <onboarding@resend.dev>",
          to: [adminEmail],
          replyTo: email || undefined,
          subject: `طلب خدمة جديد - ${name}`,
          html: emailShell({
            content: adminContent,
            title: "كوكب الصين",
            subtitle: "إدارة طلبات الخدمات",
          }),
          attachments: [logoAttachment],
        });

        if (result.error) {
          console.error(
            "RESEND ADMIN EMAIL ERROR:",
            result.error
          );
        } else {
          emailSent = true;

          console.log(
            "SERVICE REQUEST ADMIN EMAIL SENT:",
            result.data?.id
          );

          // ============================
          // EMAIL TO CUSTOMER
          // ============================

          if (email) {
            try {
              const customerContent = `
                <div
                  style="
                    text-align:center;
                    margin-bottom:30px;
                  "
                >
                  <div
                    style="
                      width:54px;
                      height:54px;
                      margin:0 auto 20px;
                      border-radius:50%;
                      background:#c94a3d;
                      color:#ffffff;
                      font-size:28px;
                      line-height:54px;
                      text-align:center;
                    "
                  >
                    ✓
                  </div>

                  <h1
                    style="
                      margin:0;
                      color:#171717;
                      font-size:27px;
                      line-height:1.6;
                    "
                  >
                    تم استلام طلبك بنجاح
                  </h1>

                  <p
                    style="
                      margin:12px auto 0;
                      max-width:520px;
                      color:#8a8179;
                      font-size:14px;
                      line-height:2;
                    "
                  >
                    أهلًا ${escapeHtml(name)}،
                    <br />
                    شكرًا لتواصلك مع كوكب الصين.
                    تم استلام طلبك بنجاح وسيقوم فريقنا بمراجعته والتواصل معك قريبًا.
                  </p>
                </div>

                ${requestRows({
                  name,
                  email,
                  phone,
                  service,
                  language,
                  details,
                  requestId: String(data.id),
                })}

                <div
                  style="
                    margin-top:26px;
                    padding:20px;
                    background:#f8f6f2;
                    border-radius:18px;
                    text-align:center;
                  "
                >
                  <div
                    style="
                      color:#554d46;
                      font-size:13px;
                      font-weight:bold;
                    "
                  >
                    ماذا بعد؟
                  </div>

                  <div
                    style="
                      margin-top:8px;
                      color:#8a8179;
                      font-size:13px;
                      line-height:1.9;
                    "
                  >
                    سيقوم فريق كوكب الصين بمراجعة طلبك
                    والتواصل معك عبر بيانات التواصل التي أدخلتها.
                  </div>
                </div>
              `;

              const customerResult = await resend.emails.send({
                from: "China Planet <onboarding@resend.dev>",
                to: [email],
                subject: "تم استلام طلبك - كوكب الصين",
                html: emailShell({
                  content: customerContent,
                  title: "كوكب الصين",
                  subtitle: "خدمات متكاملة بين السعودية والصين",
                }),
                attachments: [logoAttachment],
              });

              if (customerResult.error) {
                console.error(
                  "RESEND CUSTOMER EMAIL ERROR:",
                  customerResult.error
                );
              } else {
                console.log(
                  "SERVICE REQUEST CUSTOMER EMAIL SENT:",
                  customerResult.data?.id
                );
              }
            } catch (customerEmailError) {
              console.error(
                "RESEND CUSTOMER EMAIL SEND ERROR:",
                customerEmailError
              );
            }
          }
        }
      } catch (emailError) {
        console.error(
          "RESEND SEND ERROR:",
          emailError
        );
      }
    } else {
      console.error(
        "RESEND CONFIG ERROR: RESEND_API_KEY or ADMIN_EMAIL is missing."
      );
    }

    return NextResponse.json(
      {
        success: true,
        emailSent,
        request: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "SERVICE REQUEST API ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "حدث خطأ غير متوقع.",
      },
      { status: 500 }
    );
  }
}
