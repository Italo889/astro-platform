import type { BirthInput, PersonalReport, NumerologyNumbers, ArcanaAnalysis, AstrologyResult } from "./types";
import { calculateAstrologicalChart, getCoordinatesForPlace } from "./lib/astro";
import { sumAllDigits, sumFromName, sumDateAsIntegers, calculateAnnualSum, reduceToSingleDigit, reduceToTarotNumber } from "./lib/numerology";
import { getArcanaByNumber } from "./lib/arcana";

export async function computeReport(input: BirthInput): Promise<PersonalReport> {
  if (!input.birthTime || !input.birthPlace) {
    throw new Error("Hora e local de nascimento são necessários para um relatório completo.");
  }
  
  const coords = await getCoordinatesForPlace(input.birthPlace);
  const birthDateTime = new Date(`${input.birthDate}T${input.birthTime}:00`);
  const astrology = calculateAstrologicalChart(birthDateTime, coords);
  
  // --- CÁLCULOS DE TARÔ ---

  // 1. Somas Brutas
  const personalSum = sumAllDigits(input.birthDate);
  const greerSum = sumDateAsIntegers(input.birthDate);
  const annualSum = calculateAnnualSum(input.birthDate);
  const destinySum = input.name ? sumFromName(input.name) : undefined;

  // 2. Reduções Específicas
  const personalNumber = reduceToTarotNumber(personalSum);
  const personalityNumber = reduceToTarotNumber(greerSum);
  const soulNumber = reduceToSingleDigit(personalityNumber); // A Alma é a redução da Personalidade
  const annualNumber = reduceToTarotNumber(annualSum);
  const destinyNumber = destinySum ? reduceToTarotNumber(destinySum) : undefined;
  
  // 3. Encontrando os Arcanos
  const arcana: ArcanaAnalysis = {
    personalArcana: getArcanaByNumber(personalNumber),
    personalityArcana: getArcanaByNumber(personalityNumber),
    soulArcana: getArcanaByNumber(soulNumber),
    annualArcana: getArcanaByNumber(annualNumber),
    destinyArcana: destinyNumber ? getArcanaByNumber(destinyNumber) : undefined,
  };
  
  // 4. Montando o objeto de Numerologia final
  const numerology: NumerologyNumbers = {
    personalNumber: arcana.personalArcana.id,
    personalityNumber: arcana.personalityArcana.id,
    soulNumber: arcana.soulArcana.id,
    annualNumber: arcana.annualArcana.id,
    destinyNumber: arcana.destinyArcana?.id,
  };
  
  // 5. SUMMARY DINÂMICO E CORRIGIDO
  const currentYear = new Date().getFullYear();
  let summary = `Sua identidade fundamental é moldada pelo Arcano Pessoal **${arcana.personalArcana.name} (${arcana.personalArcana.id})**. Astrologicamente, seu Sol em ${astrology.sun}, Lua em ${astrology.moon} e Ascendente em ${astrology.ascendant} formam a tríade da sua personalidade.`;
  summary += ` O método Greer revela sua **Personalidade (${arcana.personalityArcana.id})**, o arcana **${arcana.personalityArcana.name}**, como seu grande desafio transformador, e sua **Alma (${arcana.soulArcana.id})**, o arcana **${arcana.soulArcana.name}**, como a lição central.`;
  if (arcana.destinyArcana) {
    summary += ` Pelo seu nome, você expressa a energia do Arcano de Destino **${arcana.destinyArcana.name} (${arcana.destinyArcana.id})**.`;
  }
  summary += ` Para o ano de ${currentYear}, sua energia de aprendizado e desenvolvimento será a do Arcano **${arcana.annualArcana.name} (${arcana.annualArcana.id})**.`;
  
  // 6. RELATÓRIO FINAL
  return { astrology, numerology, arcana, summary };
}

// Re-exportar o motor de Sinastria para manter o acesso centralizado
export { computeSynastry } from './lib/synastry';