// =========================================================================
// TIPOS PRIMITIVOS E ENUMS
// =========================================================================

export type SunSignName =
  | "Áries" | "Touro" | "Gêmeos" | "Câncer" | "Leão" | "Virgem" | "Libra" 
  | "Escorpião" | "Sagitário" | "Capricórnio" | "Aquário" | "Peixes";

export type ChineseZodiacSign = 
  | "Rato" | "Boi" | "Tigre" | "Coelho" | "Dragão" | "Serpente" 
  | "Cavalo" | "Cabra" | "Macaco" | "Galo" | "Cão" | "Porco";

// =========================================================================
// TIPOS DE DADOS DO DOMÍNIO
// =========================================================================

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

// =========================================================================
// ESTRUTURA DOS RELATÓRIOS FINAIS
// =========================================================================

/**
 * Define a estrutura da parte astrológica do relatório.
 */
export interface AstrologyResult {
  sun: SunSignName;
  moon: SunSignName;
  ascendant: SunSignName;
  mercury: SunSignName;
  venus: SunSignName;
  mars: SunSignName;
  jupiter: SunSignName;
  saturn: SunSignName;
  chineseZodiac: ChineseZodiacSign;
}

/**
 * Define a estrutura da parte tarológica do relatório, com todos os arcanos.
 */
export interface ArcanaAnalysis {
  personalArcana: MajorArcana;    // Soma dos dígitos da data
  personalityArcana: MajorArcana; // Método Greer (Personalidade)
  soulArcana: MajorArcana;        // Método Greer (Alma)
  annualArcana: MajorArcana;      // Arcano do Ano Atual
  destinyArcana?: MajorArcana;     // Arcano do Nome
}

/**
 * Define a estrutura da parte numerológica do relatório (os números finais).
 */
export interface NumerologyNumbers {
  personalNumber: number;
  personalityNumber: number;
  soulNumber: number;
  annualNumber: number;
  destinyNumber?: number;
}

/**
 * O Relatório Pessoal final e consolidado, que une todas as análises.
 * Este é o principal objeto que sua API irá retornar.
 */
export interface PersonalReport {
  astrology: AstrologyResult;
  numerology: NumerologyNumbers;
  arcana: ArcanaAnalysis;
  summary: string;
}

/**
 * O tipo de entrada esperado pelo motor de cálculo.
 */
export type BirthInput = {
  name: string;
  birthDate: string;    // "1998-09-14"
  birthTime: string;    // "14:05"
  birthPlace: string;   // "Rio de Janeiro, Brasil"
};

// --- TIPOS PARA SINASTRIA (Mantidos para a funcionalidade futura) ---

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