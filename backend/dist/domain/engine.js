"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeSynastry = void 0;
exports.computeReport = computeReport;
const astro_1 = require("./lib/astro");
const numerology_1 = require("./lib/numerology");
// --- 1. Importa as DUAS funções de cálculo do nome ---
const nameAnalysis_1 = require("./lib/nameAnalysis");
const arcana_1 = require("./lib/arcana");
const synastry_1 = require("./lib/synastry");
Object.defineProperty(exports, "computeSynastry", { enumerable: true, get: function () { return synastry_1.computeSynastry; } });
async function computeReport(input) {
    if (!input.birthTime || !input.birthPlace) {
        throw new Error("Hora e local de nascimento são necessários para um relatório completo.");
    }
    const coords = await (0, astro_1.getCoordinatesForPlace)(input.birthPlace);
    const [year, month, day] = input.birthDate.split('-').map(Number);
    const [hour, minute] = input.birthTime.split(':').map(Number);
    const timezoneOffset = -3;
    const birthDetails = { year, month, day, hour, minute, timezoneOffset };
    const astrology = (0, astro_1.calculateAstrologicalChart)(birthDetails, coords);
    // --- Cálculos de Numerologia e Arcanos ---
    const personalSum = (0, numerology_1.sumAllDigits)(input.birthDate);
    const greerSum = (0, numerology_1.sumDateAsIntegers)(input.birthDate);
    const annualSum = (0, numerology_1.calculateAnnualSum)(input.birthDate);
    const destinySum = input.name ? (0, numerology_1.sumFromName)(input.name) : undefined;
    // --- 2. Calcula OS DOIS Arcanos do Nome ---
    const cabalisticNameNumber = input.name ? (0, nameAnalysis_1.calculateCabalisticArcanum)(input.name) : undefined;
    const gematriaNameNumber = input.name ? (0, nameAnalysis_1.calculateGematriaArcanum)(input.name) : undefined;
    const personalityNumber = (0, numerology_1.reduceToTarotNumber)(greerSum);
    const soulNumber = (0, numerology_1.reduceToSingleDigit)(personalityNumber);
    // --- 3. Adiciona os dois resultados ao objeto 'arcana' ---
    const arcana = {
        personalArcana: (0, arcana_1.getArcanaByNumber)((0, numerology_1.reduceToTarotNumber)(personalSum)),
        personalityArcana: (0, arcana_1.getArcanaByNumber)(personalityNumber),
        soulArcana: (0, arcana_1.getArcanaByNumber)(soulNumber),
        annualArcana: (0, arcana_1.getArcanaByNumber)((0, numerology_1.reduceToTarotNumber)(annualSum)),
        destinyArcana: destinySum ? (0, arcana_1.getArcanaByNumber)((0, numerology_1.reduceToTarotNumber)(destinySum)) : undefined,
        cabalisticNameArcana: cabalisticNameNumber ? (0, arcana_1.getArcanaByNumber)(cabalisticNameNumber) : undefined,
        gematriaNameArcana: gematriaNameNumber ? (0, arcana_1.getArcanaByNumber)(gematriaNameNumber) : undefined,
    };
    // --- 4. Adiciona os dois resultados ao objeto 'numerology' ---
    const numerology = {
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
        }
        else {
            nameArcanaText = ` Seu nome, pelo **Arcano Cabalístico**, revela a energia de **${arcana.cabalisticNameArcana.name}**. Já pelo **Arcano de Gematria**, que analisa a vibração mais profunda, ele aponta para **${arcana.gematriaNameArcana.name}**.`;
        }
    }
    const summary = `Sua identidade astrológica é marcada pelo Sol em ${astrology.sun.sign} na Casa ${astrology.sun.house}, a Lua em ${astrology.moon.sign} na Casa ${astrology.moon.house} e o Ascendente em ${astrology.ascendant.sign}. No Tarô, sua data de nascimento revela o Arcano **${arcana.personalArcana.name}** como sua base.${nameArcanaText} O método Greer revela sua Personalidade, o arcano **${arcana.personalityArcana.name}**, e sua Alma, o arcano **${arcana.soulArcana.name}**. Para ${currentYear}, seu foco é o **${arcana.annualArcana.name}**.`;
    return { astrology, numerology, arcana, summary };
}
