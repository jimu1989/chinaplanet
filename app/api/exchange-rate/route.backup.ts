import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(
      "https://open.er-api.com/v6/latest/SAR",
      {
        next: { revalidate: 900 },
      }
    );

    if (!response.ok) {
      throw new Error(`Exchange API returned ${response.status}`);
    }

    const data = await response.json();

    if (data.result !== "success" || !data.rates) {
      throw new Error("Invalid exchange-rate response");
    }

    return NextResponse.json({
      base: "SAR",
      rates: {
        SAR: 1,
        CNY: data.rates.CNY,
        USD: data.rates.USD,
      },
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        error: "Unable to fetch exchange rates",
      },
      { status: 503 }
    );
  }
}
