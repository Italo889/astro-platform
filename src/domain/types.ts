// =========================================================================
// TIPOS DE CONFIGURAÇÃO E ENUMS (O que o front-end precisa saber)
// =========================================================================

export type SunSignName =
  | "Áries" | "Touro" | "Gêmeos" | "Câncer" | "Leão" | "Virgem" | "Libra" 
  | "Escorpião" | "Sagitário" | "Capricórnio" | "Aquário" | "Peixes";

// =========================================================================
// TIPOS DE DADOS DO DOMÍNIO (Estruturas que a UI renderiza)
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
// TIPOS DE RELATÓRIO (O que a API retorna)
// =========================================================================

export interface AstrologyResult {
  sun: SunSignName; // CORRIGIDO: O sol é diretamente o nome do signo.
  moon?: SunSignName;
  ascendant?: SunSignName;
}

export interface NumerologyNumbers {
  lifePath: number;
  destiny?: number;
  soulUrge?: number;
  personality?: number;
}

export interface ArcanaAnalysis {
  lifePathArcana: MajorArcana;
  personalArcana: MajorArcana; // ADICIONADO: Essencial para a "Tríade de Poder".
  destinyArcana?: MajorArcana;
  soulUrgeArcana?: MajorArcana;
  personalityArcana?: MajorArcana;
}

/**
 * O Relatório Pessoal completo, como retornado pela API de cálculo
 * ou dentro do campo 'content' de um relatório salvo.
 */
export interface PersonalReport {
  astrology: AstrologyResult;
  numerology: NumerologyNumbers;
  arcana: ArcanaAnalysis;
  summary: string;
}

/**
 * O Relatório de Sinastria completo.
 */
export interface SynastryReport {
  person1Name: string;
  person2Name: string;
  overallHarmony: number;
  // ...outros campos da sinastria
}

/**
 * ADICIONADO: O tipo mais importante. Representa um relatório
 * como ele existe no banco de dados e é retornado pelas rotas GET.
 */
export interface SavedReport {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  // O 'content' pode ser um dos dois tipos de relatório
  content: PersonalReport | SynastryReport; 
}