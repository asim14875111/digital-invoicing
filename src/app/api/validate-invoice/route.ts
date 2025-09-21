// src/app/api/validate-invoice/route.ts
import { NextRequest, NextResponse } from "next/server";
// POST /api/validate-invoice
export async function POST(req: NextRequest) {
  try {
    const { environment, token, customerData } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const fbrUrl =
      environment === "sandbox"
        ? "https://gw.fbr.gov.pk/di_data/v1/di/postinvoicedata_sb"
        : "https://gw.fbr.gov.pk/di_data/v1/di/postinvoicedata";

    const fbrRes = await fetch(fbrUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(customerData),
    });

    // Try parsing JSON, fallback to text
    let responseBody: unknown;
    const rawText = await fbrRes.text();

    try {
      responseBody = JSON.parse(rawText);
    } catch {
      responseBody = { raw: rawText };
    }

    // Log what FBR really sent back
    console.log("FBR response:", responseBody);
    // alert(responseBody)

    return NextResponse.json(
      {
        status: fbrRes.status,
        ok: fbrRes.ok,
        data: responseBody,
      },
      { status: fbrRes.status }
    );
  } catch (err: unknown) {
    console.error("Error in /api/validate-invoice:", err);
    const errorMessage =
      err instanceof Error
        ? err.message
        : typeof err === "string"
        ? err
        : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
