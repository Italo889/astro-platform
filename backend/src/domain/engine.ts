import type { BirthInput, PersonalReport, NumerologyNumbers, ArcanaAnalysis, AstrologyResult, BirthDetails } from "./types";
import { calculateAstrologicalChart, getCoordinatesForPlace } from "./lib/astro";
import { sumAllDigits, sumFromName, sumDateAsIntegers, calculateAnnualSum, reduceToSingleDigit, reduceToTarotNumber } from "./lib/numerology";
// --- 1. Importa as DUAS funções de cálculo do nome ---
import { calculateCabalisticArcanum, calculateGematriaArcanum } from "./lib/nameAnalysis"; 
import { getArcanaByNumber } from "./lib/arcana";

export async function computeReport(input: BirthInput): Promise<PersonalReport> {
  if (!input.birthTime || !input.birthPlace) {
    throw new Error("Hora e local de nascimento são necessários para um relatório completo.");
  }

  const coords = await getCoordinatesForPlace(input.birthPlace);
  const [year, month, day] = input.birthDate.split('-').map(Number);
  const [hour, minute] = input.birthTime.split(':').map(Number);
  const timezoneOffset = -3;
  const birthDetails: BirthDetails = { year, month, day, hour, minute, timezoneOffset };
  
  const astrology = calculateAstrologicalChart(birthDetails, coords);
  
  // --- Cálculos de Numerologia e Arcanos ---
  const personalSum = sumAllDigits(input.birthDate);
  const greerSum = sumDateAsIntegers(input.birthDate);
  const annualSum = calculateAnnualSum(input.birthDate);
  const destinySum = input.name ? sumFromName(input.name) : undefined;
  
  // --- 2. Calcula OS DOIS Arcanos do Nome ---
  const cabalisticNameNumber = input.name ? calculateCabalisticArcanum(input.name) : undefined;
  const gematriaNameNumber = input.name ? calculateGematriaArcanum(input.name) : undefined;

  const personalityNumber = reduceToTarotNumber(greerSum);
  const soulNumber = reduceToSingleDigit(personalityNumber);
  
  // --- 3. Adiciona os dois resultados ao objeto 'arcana' ---
  const arcana: ArcanaAnalysis = {
    personalArcana: getArcanaByNumber(reduceToTarotNumber(personalSum)),
    personalityArcana: getArcanaByNumber(personalityNumber),
    soulArcana: getArcanaByNumber(soulNumber),
    annualArcana: getArcanaByNumber(reduceToTarotNumber(annualSum)),
    destinyArcana: destinySum ? getArcanaByNumber(reduceToTarotNumber(destinySum)) : undefined,
    cabalisticNameArcana: cabalisticNameNumber ? getArcanaByNumber(cabalisticNameNumber) : undefined,
    gematriaNameArcana: gematriaNameNumber ? getArcanaByNumber(gematriaNameNumber) : undefined,
  };
  
  // --- 4. Adiciona os dois resultados ao objeto 'numerology' ---
  const numerology: NumerologyNumbers = {
    personalNumber: arcana.personalArcana.id,
    personalityNumber: arcana.personalityArcana.id,
    soulNumber: arcana.soulArcana.id,
    annualNumber: arcana.annualArcana.id,
    destinyNumber: arcana.destinyArcana?.id,
    cabalisticNameNumber: arcana.cabalisticNameArcana?.id,
    gematriaNameNumber: arcana.gematriaNameArcana?.id,
  };
  
  // --- 5. Cria um sumário inteligente que apresenta os dois resultados ---
  const currentYear = new Date().getFullYear();
  
  let nameArcanaText = "";
  if (arcana.cabalisticNameArcana && arcana.gematriaNameArcana) {
    // Se os resultados forem iguais, cria uma mensagem de reforço
    if (arcana.cabalisticNameArcana.id === arcana.gematriaNameArcana.id) {
        nameArcanaText = ` Seu nome de batismo ressoa de forma unificada com o Arcano **${arcana.cabalisticNameArcana.name}**, guiando sua expressão no mundo.`;
    // Se forem diferentes, apresenta ambos
    } else {
        nameArcanaText = ` Seu nome, pelo **Arcano Cabalístico**, revela a energia de **${arcana.cabalisticNameArcana.name}**. Já pelo **Arcano de Gematria**, que analisa a vibração mais profunda, ele aponta para **${arcana.gematriaNameArcana.name}**.`;
    }
  }

  const summary = `Sua identidade astrológica é marcada pelo Sol em ${astrology.sun.sign} na Casa ${astrology.sun.house}, a Lua em ${astrology.moon.sign} na Casa ${astrology.moon.house} e o Ascendente em ${astrology.ascendant.sign}. No Tarô, sua data de nascimento revela o Arcano **${arcana.personalArcana.name}** como sua base.${nameArcanaText} O método Greer revela sua Personalidade, o arcano **${arcana.personalityArcana.name}**, e sua Alma, o arcano **${arcana.soulArcana.name}**. Para ${currentYear}, seu foco é o **${arcana.annualArcana.name}**.`;
  
  return { astrology, numerology, arcana, summary };
}