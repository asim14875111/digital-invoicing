// Explicit mapping of valid UoMs for specific HS Codes (expand with authoritative data)
export const hsCodeUomMap: { [hsCode: string]: string[] } = {
  // Live animals (example)
  '01012100': ['Numbers', 'Pieces', 'Units', 'Head'],
  '29309091': ['kg', 'MT'],
  '29309092': ['Liter'],
  '29309093': ['kg', 'Bag'],
  // A few more illustrative examples (adjust per FBR reference):
  '27101910': ['Liter', 'kg', 'Gallon', 'MT'], // Light oils
  '27101943': ['Liter', 'kg', 'Gallon', 'MT'], // Lubricating oils
  '30049010': ['Pieces', 'kg'], // Pharma medicaments
  '33030000': ['Liter', 'kg'], // Perfumes
  '39269099': ['Pieces', 'kg'], // Plastics articles
  '44072900': ['Cubic Metre', 'Meter', 'Pieces'], // Wood sawn
  '48025690': ['kg', 'Pieces'], // Paper
  '62034290': ['Pieces', 'Dozen', 'Pair'], // Garments
  '64039900': ['Pair', 'Pieces'], // Footwear
  '71023100': ['Carat', 'Pieces'], // Diamonds
  '72083990': ['kg', 'MT'], // Steel
  '73089090': ['kg', 'Pieces', 'MT'], // Structures of iron/steel
  '84089090': ['Pieces', 'Set', 'kg'], // Engines
  '85044090': ['Pieces', 'Set', 'kg'], // Electrical transformers
  '90019000': ['Pieces', 'Set'], // Optical instruments
  '87089900': ['Pieces', 'Set', 'kg'], // Vehicle parts
  '94017900': ['Pieces', 'Set'], // Furniture
  '68159900': ['kg', 'MT'], // Stone/Articles
};

// Chapter-level default UoMs for broad HS chapters (fallback when no explicit mapping exists)
const chapterDefaults: { [chapter2: string]: string[] } = {
  '01': ['Numbers', 'Pieces', 'Units', 'Head'], // Live animals
  '22': ['Liter'], // Beverages
  '27': ['Liter', 'kg', 'Gallon', 'MT', 'MMBTU'], // Mineral fuels
  '29': ['kg', 'Liter', 'MT', 'Bag'], // Organic chemicals
  '30': ['kg', 'Pieces'], // Pharmaceuticals
  '33': ['Liter', 'kg'], // Essential oils/perfumes
  '39': ['kg', 'Pieces', 'Meter'], // Plastics and articles
  '44': ['Cubic Metre', 'Meter', 'Pieces'], // Wood
  '48': ['kg', 'Pieces'], // Paper
  '62': ['Pieces', 'Dozen', 'Pair'], // Garments
  '64': ['Pair', 'Pieces'], // Footwear
  '71': ['Carat', 'Pieces'], // Precious stones
  '72': ['kg', 'MT'], // Iron and steel
  '73': ['kg', 'Pieces', 'MT'], // Articles of iron or steel
  '84': ['Pieces', 'Set', 'kg'], // Machinery
  '85': ['Pieces', 'Set', 'kg'], // Electrical machinery
  '87': ['Pieces', 'Set', 'kg'], // Vehicles/parts
  '90': ['Pieces', 'Set'], // Optical/medical instruments
  '94': ['Pieces', 'Set'], // Furniture
  '68': ['kg', 'MT'], // Stone, plaster
};

// Helper: returns explicitly mapped UoMs or chapter defaults
export function getAllowedUomsForHs(hsCode: string): string[] | undefined {
  if (!hsCode) return undefined;
  const raw = String(hsCode).replace(/\D/g, ''); // digits only
  if (!raw) return undefined;
  if (hsCodeUomMap[raw]) return hsCodeUomMap[raw];
  const chapter = raw.slice(0, 2);
  return chapterDefaults[chapter];
}
