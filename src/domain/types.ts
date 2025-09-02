// frontend/src/domain/types.ts

export type SunSignName =
  | "Áries" | "Touro" | "Gêmeos" | "Câncer" | "Leão" | "Virgem" | "Libra" 
  | "Escorpião" | "Sagitário" | "Capricórnio" | "Aquário" | "Peixes";

export type ChineseZodiacSign = 
  | "Rato" | "Boi" | "Tigre" | "Coelho" | "Dragão" | "Serpente" 
  | "Cavalo" | "Cabra" | "Macaco" | "Galo" | "Cão" | "Porco";

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

// --- ESTRUTURA DE ASTROLOGIA ATUALIZADA ---

// NOVO: Define a estrutura para um planeta, com signo, casa e posição.
export interface PlanetInfo {
  sign: SunSignName;
  house: number;
  longitude: number;
}

// ATUALIZADO: Agora reflete os dados ricos que o backend envia.
export interface AstrologyResult {
  sun: PlanetInfo;
  moon: PlanetInfo;
  mercury: PlanetInfo;
  venus: PlanetInfo;
  mars: PlanetInfo;
  jupiter: PlanetInfo;
  saturn: PlanetInfo;
  
  ascendant: {
    sign: SunSignName;
    longitude: number;
  };

  houseCusps: {
    [house: number]: number;
  };
  
  chineseZodiac: ChineseZodiacSign;
}

// --- O RESTO DOS SEUS TIPOS (JÁ ESTAVAM CORRETOS) ---

export interface ArcanaAnalysis {
  personalArcana: MajorArcana;
  personalityArcana: MajorArcana;
  soulArcana: MajorArcana;
  annualArcana: MajorArcana;
  destinyArcana?: MajorArcana;
  cabalisticNameArcana?: MajorArcana;
  gematriaNameArcana?: MajorArcana;
}

export interface NumerologyNumbers {
  personalNumber: number;
  personalityNumber: number;
  soulNumber: number;
  annualNumber: number;
  destinyNumber?: number;
  cabalisticNameNumber?: number;
  gematriaNameNumber?: number;
}

export interface PersonalReport {
  astrology: AstrologyResult;
  numerology: NumerologyNumbers;
  arcana: ArcanaAnalysis;
  summary: string;
}

export interface CompatibilityAspect {
  title: string;
  harmonyScore: number;
  summary: string;
  details: string;
};

export interface SynastryReport {
  person1Name: string;
  person2Name: string;
  overallHarmony: number;
  sunSignAspect: CompatibilityAspect;
  lifePathAspect: CompatibilityAspect;
  archetypeAspect: CompatibilityAspect; 
};

export interface SavedReport {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  content: PersonalReport | SynastryReport; 
}

export type BirthInput = {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
};

// NOVO: Adicionado para manter a consistência com o backend
export interface BirthDetails {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  timezoneOffset: number;
}

// Sistema de Badges
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: Date;
}