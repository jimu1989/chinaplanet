import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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

    return NextResponse.json(
      {
        success: true,
        request: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("SERVICE REQUEST API ERROR:", error);

    return NextResponse.json(
      {
        error: "حدث خطأ غير متوقع.",
      },
      { status: 500 }
    );
  }
}
