// Normalizes UI UoM labels to FBR-expected codes (best-effort; expand as needed)
export function normalizeUom(input: string): string {
  const val = (input || "").trim().toLowerCase();
  const map: Record<string, string> = {
    kg: "KG",
    kilogram: "KG",
    mt: "MT",
    tonne: "MT",
    ton: "MT",
    liter: "LTR",
    litre: "LTR",
    ltr: "LTR",
    bag: "BAG",
    bags: "BAG",
    piece: "PCS",
    pieces: "PCS",
    pcs: "PCS",
    meter: "METER",
    metre: "METER",
    m: "METER",
    gallon: "GALLON",
    gallons: "GALLON",
    pound: "POUND",
    pounds: "POUND",
    carat: "CARAT",
    dozen: "DOZEN",
    mmbtu: "MMBTU",
    "sq yard": "SQUARE_YARD",
    "square yard": "SQUARE_YARD",
    "cubic metre": "CBM",
    "cubic meter": "CBM",
  };
  return map[val] || input; // fallback to original
}
