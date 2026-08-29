import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (
    mode === "subscribe" &&
    token &&
    verifyToken &&
    token === verifyToken &&
    challenge
  ) {
    return new Response(challenge, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return NextResponse.json(
    {
      ok: false,
      error: "Invalid verification request",
    },
    { status: 403 }
  );
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
