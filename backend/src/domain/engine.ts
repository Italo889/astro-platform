import type { BirthInput, Report, NumerologyNumbers, ArcanaAnalysis, AstrologyResult } from "./types";
import { computeSunSign } from "./lib/astro";
import { lifePathFromDate, destinyFromName } from "./lib/numerology";
import { getArcanaByNumber } from "./lib/arcana";

// No futuro, isso pode ser uma opção que o usuário escolhe na interface.
const ARCANA_MAPPING_STRATEGY = "foolZero";
const NUMEROLOGY_METHOD_STRATEGY = "pitagorico";

/**
 * O motor principal que orquestra todos os cálculos para gerar um relatório completo.
 * @param input - Os dados de nascimento fornecidos pelo usuário.
 * @returns Um objeto Report completo e tipado.
 */
export function computeReport(input: BirthInput): Report {
  // 1. ASTROLOGIA (Simples, por enquanto)
  const astrology: AstrologyResult = computeSunSign(input.birthDate);

  // 2. NUMEROLOGIA: Calculamos todos os números e montamos o objeto NumerologyNumbers
  const numerology: NumerologyNumbers = {
    lifePath: lifePathFromDate(input.birthDate),
    destiny: input.name ? destinyFromName(input.name) : undefined,
    // (Placeholders para futuras expansões)
    // soulUrge: input.name ? soulUrgeFromName(input.name) : undefined,
    // personality: input.name ? personalityFromName(input.name) : undefined,
  };

  // 3. ARCANOS: Usamos getArcanaByNumber para cada número e montamos o objeto ArcanaAnalysis
  const arcana: ArcanaAnalysis = {
    lifePathArcana: getArcanaByNumber(numerology.lifePath),
    destinyArcana: numerology.destiny ? getArcanaByNumber(numerology.destiny) : undefined,
    method: NUMEROLOGY_METHOD_STRATEGY,
    mapping: ARCANA_MAPPING_STRATEGY,
  };
  
  // 4. SUMMARY: Criamos um resumo mais didático e inspirador, como planejado.
  let summary = `Seu Sol em ${astrology.sun} ilumina sua identidade. Seu Caminho de Vida, guiado pelo número ${numerology.lifePath}, revela sua jornada e missão principal, representada pelo arcano **${arcana.lifePathArcana.name}**.`;
  if (numerology.destiny && arcana.destinyArcana) {
    summary += ` Seu nome revela um Número de Destino ${numerology.destiny}, um chamado para expressar a energia do arcano **${arcana.destinyArcana.name}** através de seus talentos.`;
  }
  
  // 5. RELATÓRIO FINAL: Montamos o objeto Report completo, com todas as chaves corretas.
  const finalReport: Report = {
    astrology,
    numerology,
    arcana,
    summary,
  };

  return finalReport;
}


// NOVO: Re-exportando o motor de Sinastria para centralizar o acesso
export { computeSynastry } from './lib/synastry';