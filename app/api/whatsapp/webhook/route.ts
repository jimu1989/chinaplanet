import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "whatsapp-webhook",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    console.log("WhatsApp webhook received:", body);

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "حدث خطأ أثناء معالجة طلب واتساب.",
      },
      { status: 500 }
    );
  }
}
