export type SunSignName =
  | "Áries" | "Touro" | "Gêmeos" | "Câncer" | "Leão" | "Virgem" | "Libra" | "Escorpião" | "Sagitário" | "Capricórnio" | "Aquário" | "Peixes";

export type ChineseZodiacSign = 
  | "Rato" | "Boi" | "Tigre" | "Coelho" | "Dragão" | "Serpente" | "Cavalo" | "Cabra" | "Macaco" | "Galo" | "Cão" | "Porco";

export interface MajorArcana {
  readonly id: number;
  readonly name: string;
  readonly keywords: readonly string[];
  readonly description: string;
  readonly longDescription: string;
  readonly light: string;
  readonly shadow: string;
  readonly advice: string;
}

export interface PlanetInfo {
  sign: SunSignName;
  house: number;
  longitude: number;
}

export interface AstrologyResult {
  sun: PlanetInfo;
  moon: PlanetInfo;
  mercury: PlanetInfo;
  venus: PlanetInfo;
  mars: PlanetInfo;
  jupiter: PlanetInfo;
  saturn: PlanetInfo;
  
  // O Ascendente é um ponto, não um planeta, então tratamos de forma um pouco diferente
  ascendant: {
    sign: SunSignName;
    longitude: number;
  };

  // As cúspides (início) de cada uma das 12 casas
  houseCusps: {
    [house: number]: number; // ex: { 1: 278.5, 2: 310.2, ... }
  };
  
  chineseZodiac: ChineseZodiacSign;
}


export interface ArcanaAnalysis {
  personalArcana: MajorArcana;    // Soma dos dígitos da data
  personalityArcana: MajorArcana; // Método Greer (Personalidade)
  soulArcana: MajorArcana;        // Método Greer (Alma)
  annualArcana: MajorArcana;      // Arcano do Ano Atual
  destinyArcana?: MajorArcana;     // Arcano do Nome
  cabalisticNameArcana?: MajorArcana;
  gematriaNameArcana?: MajorArcana;
}

export interface NumerologyNumbers {
  personalNumber: number;
  personalityNumber: number;
  soulNumber: number;
  annualNumber: number;
  destinyNumber?: number;
  cabalisticNameNumber?: number; // <-- ANTIGO nameNumber RENOMEADO
  gematriaNameNumber?: number;
}

export interface PersonalReport {
  astrology: AstrologyResult;
  numerology: NumerologyNumbers;
  arcana: ArcanaAnalysis;
  summary: string;
}

export type BirthInput = {
  name: string;
  birthDate: string;    // "1998-09-14"
  birthTime: string;    // "14:05"
  birthPlace: string;   // "Rio de Janeiro, Brasil"
};

// --- ADICIONADO PARA CORRIGIR O ERRO ---
// Esta é a interface que seu motor de cálculo (engine.ts) cria
// e que seu módulo de astrologia (astro.ts) espera receber.
export interface BirthDetails {
  year: number;
  month: number; // Mês de 1 a 12
  day: number;
  hour: number;
  minute: number;
  timezoneOffset: number;
}

export type CompatibilityAspect = {
  title: string;
  harmonyScore: number;
  summary: string;
  details: string;
};

export type SynastryReport = {
  person1Name: string;
  person2Name: string;
  overallHarmony: number;
  sunSignAspect: CompatibilityAspect;
  lifePathAspect: CompatibilityAspect;
  archetypeAspect: CompatibilityAspect; 
};