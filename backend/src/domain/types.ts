// src/domain/types.ts

// =========================================================================
// TIPOS DE ENTRADA (INPUTS)
// =========================================================================

export type BirthInput = {
  name?: string;           // Nome completo para numerologia do nome
  birthDate: string;      // Formato ISO: "1998-09-14"
  birthTime?: string;      // "14:05" (opcional, para cálculo do ascendente)
  birthPlace?: string;     // Futuramente pode virar um objeto com coordenadas
};

// =========================================================================
// TIPOS DE CONFIGURAÇÃO E ENUMS
// =========================================================================

export type SunSign =
  | "Áries" | "Touro" | "Gêmeos" | "Câncer" | "Leão" | "Virgem" | "Libra" 
  | "Escorpião" | "Sagitário" | "Capricórnio" | "Aquário" | "Peixes";

export type NumerologyMethod = "pitagorico" | "cabalistico";
export type ArcanaMapping = "foolZero" | "fool22";

// =========================================================================
// TIPOS DE DADOS DO DOMÍNIO (A "ALMA" DO PROJETO)
// =========================================================================

/**
 * REFINAMENTO 1: A estrutura de dados completa para um Arcano Maior,
 * pronta para alimentar uma página de resultados rica e detalhada.
 */
export type MajorArcana = {
  readonly id: number;
  readonly name: string;
  readonly keywords: readonly string[];
  readonly description: string; // A descrição curta que já temos
  readonly longDescription: string; // NOVO: O texto completo para o modal
  readonly light: string;
  readonly shadow: string;
  readonly advice: string;
};
// =========================================================================
// TIPOS DE RESULTADO (OUTPUTS)
// =========================================================================

export type NumerologyNumbers = {
  lifePath: number;         // Calculado da data de nascimento
  destiny?: number;         // Calculado do nome completo
  soulUrge?: number;        // Calculado das vogais do nome
  personality?: number;     // Calculado das consoantes do nome
};

export type AstrologyResult = {
  sun: SunSign;
  moon?: SunSign;           // Futuramente, quando tivermos efemérides
  ascendant?: SunSign;      // Futuramente, quando tivermos efemérides
};

/**
 * REFINAMENTO 2: O resultado do Arcano agora pode conter múltiplos arcanos,
 * um para cada número calculado, tornando a análise muito mais completa.
 */
export type ArcanaAnalysis = {
  lifePathArcana: MajorArcana;
  destinyArcana?: MajorArcana;
  soulUrgeArcana?: MajorArcana;
  personalityArcana?: MajorArcana;
  method: NumerologyMethod;
  mapping: ArcanaMapping;
};

// =========================================================================
// TIPOS FINAIS E CONTRATOS
// =========================================================================

/**
 * O Relatório Final consolidado que será entregue ao usuário.
 */
export type Report = {
  astrology: AstrologyResult;
  numerology: NumerologyNumbers;
  arcana: ArcanaAnalysis;
  summary: string; // Um texto didático que une todas as análises.
};

/**
 * O "Contrato" para nosso motor de cálculo. Uma decisão de arquitetura excelente.
 */
export interface CalculationEngine {
  compute(input: BirthInput): Report;
}

// NOVO: Define a estrutura de um único ponto de comparação na Sinastria
export type CompatibilityAspect = {
  title: string;          // Ex: "Compatibilidade Solar (Leão e Virgem)"
  harmonyScore: number;   // Uma pontuação de 0 a 100
  summary: string;        // Um resumo curto da dinâmica
  details: string;        // Uma explicação mais aprofundada
};

// NOVO: O relatório de Sinastria completo
export type SynastryReport = {
  person1Name: string;
  person2Name: string;
  overallHarmony: number; // A média de todos os harmonyScore
  sunSignAspect: CompatibilityAspect;
  lifePathAspect: CompatibilityAspect;
  archetypeAspect: CompatibilityAspect; 
};
