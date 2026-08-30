import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(
      "https://open.er-api.com/v6/latest/SAR",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Exchange API returned ${response.status}`);
    }

    const data = await response.json();

    const sarToCny = Number(data?.rates?.CNY);

    if (
      data?.result !== "success" ||
      !Number.isFinite(sarToCny) ||
      sarToCny <= 0
    ) {
      throw new Error("Invalid SAR/CNY exchange rate");
    }

    return NextResponse.json(
      {
        base: "SAR",
        quote: "CNY",
        rate: sarToCny,
        rates: {
          SAR: 1,
          CNY: sarToCny,
        },
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("EXCHANGE RATE ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to fetch SAR/CNY exchange rate",
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
