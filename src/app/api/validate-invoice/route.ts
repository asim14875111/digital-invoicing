// src/app/api/validate-invoice/route.ts
import { NextRequest, NextResponse } from "next/server";
import { hsCodeUomMap, getAllowedUomsForHs } from "@/Constants/hsCodeUomMap";
import { normalizeUom } from "@/Constants/uomNormalization";

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

    // Pre-validate UoM vs HS Code (server-side guard)
    if (customerData?.items?.length) {
      const firstItem = customerData.items[0];
      const hsDigits: string = String(firstItem.hsCode || "").replace(/\D/g, "");
      // If no HS Code provided (service scenarios), skip HS/UoM validation
      if (!hsDigits) {
        return forwardToFbr(fbrUrl, token, customerData);
      }
      const uomInput = String(firstItem.uoM || "");
      const uomNorm = normalizeUom(uomInput);
      const allowed = getAllowedUomsForHs(hsDigits);
      if (!allowed) {
        return NextResponse.json(
          {
            error: `Allowed UoMs for HS Code ${hsDigits} are not configured on server (hsCodeUomMap.ts).` ,
            errorCode: "LOCAL_VALIDATION_MISSING_MAPPING",
            status: "Invalid",
            statusCode: "01",
          },
          { status: 400 }
        );
      }
      // Validate against allowed list (either direct label CI match or normalized code match)
      const ok = allowed.some((u: string) => {
        const uLower = u.trim().toLowerCase();
        const inLower = uomInput.trim().toLowerCase();
        if (uLower === inLower) return true;
        return normalizeUom(u).toLowerCase() === uomNorm.toLowerCase();
      });
      if (!ok) {
        return NextResponse.json(
          {
            error: `Provided UoM "${firstItem.uoM}" is not allowed for HS Code ${hsDigits}. Allowed: ${allowed.join(", ")}`,
            errorCode: "LOCAL_VALIDATION_UOM_NOT_ALLOWED",
            status: "Invalid",
            statusCode: "01",
          },
          { status: 400 }
        );
      }
      // Overwrite with canonical allowed label for FBR and digits-only HS code
      const canonical =
        allowed.find((u: string) => normalizeUom(u).toLowerCase() === uomNorm.toLowerCase()) ||
        allowed.find((u: string) => u.trim().toLowerCase() === uomInput.trim().toLowerCase()) ||
        allowed[0];
      // Send normalized code expected by DI (e.g., Liter -> LTR, kg -> KG)
      customerData.items[0].uoM = normalizeUom(canonical);
      customerData.items[0].hsCode = hsDigits;
    }

    return forwardToFbr(fbrUrl, token, customerData);
  } catch (err: unknown) {
    console.error("Error in /api/validate-invoice:", err);
    const errorMessage =
      err instanceof Error
        ? err.message
        : typeof err === "string"
        ? err
        : "Internal server error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

async function forwardToFbr(fbrUrl: string, token: string, customerData: any) {
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

  return NextResponse.json(
    {
      status: fbrRes.status,
      ok: fbrRes.ok,
      data: responseBody,
    },
    { status: fbrRes.status }
  );
}
