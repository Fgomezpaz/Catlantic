import {
  ChiaGlyph,
  CornGlyph,
  GarlicGlyph,
  IronOreGlyph,
  ManganeseGlyph,
  PulsesGlyph,
  QuinoaGlyph,
  SesameGlyph,
  SoybeanGlyph,
  SunflowerGlyph,
} from './CommodityGlyphs';

export const commodityGlyphs = {
  soybean: SoybeanGlyph,
  corn: CornGlyph,
  chia: ChiaGlyph,
  quinoa: QuinoaGlyph,
  garlic: GarlicGlyph,
  pulses: PulsesGlyph,
  sesame: SesameGlyph,
  manganese: ManganeseGlyph,
  ironore: IronOreGlyph,
  sunflower: SunflowerGlyph,
} as const;

export type CommodityGlyphId = keyof typeof commodityGlyphs;
