"use strict";
// src/domain/lib/synastry.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeSynastry = computeSynastry;
const astro_1 = require("./astro");
const numerology_1 = require("./numerology");
const arcana_1 = require("./arcana");
const archetypeMatrix_1 = require("./archetypeMatrix");
// --- Lógica de Compatibilidade dos Signos Solares ---
const signCompatibilityMatrix = {
    'Áries': { 'Áries': 1, 'Touro': 0, 'Gêmeos': 2, 'Câncer': 0, 'Leão': 2, 'Virgem': 1, 'Libra': 1, 'Escorpião': 0, 'Sagitário': 2, 'Capricórnio': 0, 'Aquário': 2, 'Peixes': 1 },
    'Touro': { 'Áries': 0, 'Touro': 2, 'Gêmeos': 1, 'Câncer': 2, 'Leão': 0, 'Virgem': 2, 'Libra': 1, 'Escorpião': 1, 'Sagitário': 0, 'Capricórnio': 2, 'Aquário': 0, 'Peixes': 2 },
    'Gêmeos': { 'Áries': 2, 'Touro': 1, 'Gêmeos': 2, 'Câncer': 1, 'Leão': 2, 'Virgem': 0, 'Libra': 2, 'Escorpião': 1, 'Sagitário': 1, 'Capricórnio': 0, 'Aquário': 2, 'Peixes': 0 },
    'Câncer': { 'Áries': 0, 'Touro': 2, 'Gêmeos': 1, 'Câncer': 2, 'Leão': 1, 'Virgem': 2, 'Libra': 0, 'Escorpião': 2, 'Sagitário': 1, 'Capricórnio': 1, 'Aquário': 1, 'Peixes': 2 },
    'Leão': { 'Áries': 2, 'Touro': 0, 'Gêmeos': 2, 'Câncer': 1, 'Leão': 2, 'Virgem': 1, 'Libra': 2, 'Escorpião': 0, 'Sagitário': 2, 'Capricórnio': 1, 'Aquário': 1, 'Peixes': 0 },
    'Virgem': { 'Áries': 1, 'Touro': 2, 'Gêmeos': 0, 'Câncer': 2, 'Leão': 1, 'Virgem': 2, 'Libra': 1, 'Escorpião': 2, 'Sagitário': 0, 'Capricórnio': 2, 'Aquário': 1, 'Peixes': 1 },
    'Libra': { 'Áries': 1, 'Touro': 1, 'Gêmeos': 2, 'Câncer': 0, 'Leão': 2, 'Virgem': 1, 'Libra': 2, 'Escorpião': 1, 'Sagitário': 2, 'Capricórnio': 0, 'Aquário': 2, 'Peixes': 1 },
    'Escorpião': { 'Áries': 0, 'Touro': 1, 'Gêmeos': 1, 'Câncer': 2, 'Leão': 0, 'Virgem': 2, 'Libra': 1, 'Escorpião': 2, 'Sagitário': 1, 'Capricórnio': 2, 'Aquário': 0, 'Peixes': 2 },
    'Sagitário': { 'Áries': 2, 'Touro': 0, 'Gêmeos': 1, 'Câncer': 1, 'Leão': 2, 'Virgem': 0, 'Libra': 2, 'Escorpião': 1, 'Sagitário': 2, 'Capricórnio': 1, 'Aquário': 2, 'Peixes': 0 },
    'Capricórnio': { 'Áries': 0, 'Touro': 2, 'Gêmeos': 0, 'Câncer': 1, 'Leão': 1, 'Virgem': 2, 'Libra': 0, 'Escorpião': 2, 'Sagitário': 1, 'Capricórnio': 2, 'Aquário': 1, 'Peixes': 2 },
    'Aquário': { 'Áries': 2, 'Touro': 0, 'Gêmeos': 2, 'Câncer': 1, 'Leão': 1, 'Virgem': 1, 'Libra': 2, 'Escorpião': 0, 'Sagitário': 2, 'Capricórnio': 1, 'Aquário': 2, 'Peixes': 1 },
    'Peixes': { 'Áries': 1, 'Touro': 2, 'Gêmeos': 0, 'Câncer': 2, 'Leão': 0, 'Virgem': 1, 'Libra': 1, 'Escorpião': 2, 'Sagitário': 0, 'Capricórnio': 2, 'Aquário': 1, 'Peixes': 2 },
};
const sunSignCompatibilityText = [
    { summary: "Uma dinâmica de grande desafio e aprendizado.", details: "Suas energias solares operam em frequências muito diferentes, o que pode gerar atritos. A chave para o sucesso é um esforço consciente para entender e respeitar as perspectivas um do outro, transformando o desafio em crescimento." },
    { summary: "Uma conexão com potencial para complementaridade.", details: "Embora não haja uma harmonia natural imediata, suas energias não são diretamente opostas. Esta é uma relação de aprendizado, onde as diferenças podem se tornar forças se ambos estiverem dispostos a se adaptar e aprender um com o outro." },
    { summary: "Uma forte harmonia natural e fluidez.", details: "Suas essências solares vibram em sintonia, criando uma conexão fácil e de grande apoio mútuo. A compreensão é quase intuitiva, e juntos vocês potencializam as melhores qualidades um do outro." },
];
function getSunSignCompatibility(sign1, sign2) {
    const compatibilityLevel = signCompatibilityMatrix[sign1][sign2];
    const text = sunSignCompatibilityText[compatibilityLevel];
    const harmonyScore = (compatibilityLevel / 2) * 90 + Math.floor(Math.random() * 11);
    return {
        title: `Harmonia Solar: ${sign1} e ${sign2}`,
        harmonyScore: Math.min(100, harmonyScore),
        summary: text.summary,
        details: text.details,
    };
}
// --- Lógica de Compatibilidade do Caminho de Vida ---
const lifePathCompatibilityMatrix = {
    1: { 1: 1, 2: 1, 3: 2, 4: 0, 5: 2, 6: 0, 7: 2, 8: 0, 9: 1, 11: 1, 22: 0 },
    2: { 1: 1, 2: 1, 3: 1, 4: 2, 5: 0, 6: 2, 7: 1, 8: 2, 9: 1, 11: 2, 22: 2 },
    3: { 1: 2, 2: 1, 3: 1, 4: 0, 5: 2, 6: 2, 7: 1, 8: 0, 9: 2, 11: 1, 22: 0 },
    4: { 1: 0, 2: 2, 3: 0, 4: 1, 5: 0, 6: 1, 7: 2, 8: 2, 9: 0, 11: 2, 22: 2 },
    5: { 1: 2, 2: 0, 3: 2, 4: 0, 5: 1, 6: 0, 7: 2, 8: 1, 9: 1, 11: 0, 22: 1 },
    6: { 1: 0, 2: 2, 3: 2, 4: 1, 5: 0, 6: 1, 7: 0, 8: 2, 9: 2, 11: 2, 22: 1 },
    7: { 1: 2, 2: 1, 3: 1, 4: 2, 5: 2, 6: 0, 7: 1, 8: 0, 9: 0, 11: 1, 22: 2 },
    8: { 1: 0, 2: 2, 3: 0, 4: 2, 5: 1, 6: 2, 7: 0, 8: 1, 9: 0, 11: 2, 22: 2 },
    9: { 1: 1, 2: 1, 3: 2, 4: 0, 5: 1, 6: 2, 7: 0, 8: 0, 9: 1, 11: 1, 22: 0 },
    11: { 1: 1, 2: 2, 3: 1, 4: 2, 5: 0, 6: 2, 7: 1, 8: 2, 9: 1, 11: 2, 22: 2 },
    22: { 1: 0, 2: 2, 3: 0, 4: 2, 5: 1, 6: 1, 7: 2, 8: 2, 9: 0, 11: 2, 22: 2 },
};
const lifePathCompatibilityText = [
    { summary: "Caminhos de vida com energias fundamentalmente diferentes.", details: "Suas missões e estilos de vida podem divergir, exigindo grande respeito mútuo para transformar as diferenças em pontos fortes. O aprendizado aqui está em não tentar mudar o outro, mas em encontrar um propósito comum." },
    { summary: "Caminhos que podem aprender e crescer juntos.", details: "Não há uma oposição direta, mas a harmonia exigirá esforço consciente. Vocês têm muito a ensinar um ao outro. A chave é a comunicação e a vontade de adaptar as rotas para que as jornadas se alinhem." },
    { summary: "Caminhos de vida que se apoiam e fluem naturalmente.", details: "Suas missões e valores são naturalmente compatíveis, criando uma base sólida de entendimento e encorajamento. Juntos, vocês sentem que estão no caminho certo, potencializando a jornada um do outro." },
];
function getLifePathCompatibility(path1, path2) {
    const compatibilityLevel = lifePathCompatibilityMatrix[path1]?.[path2] ?? 1; // Padrão para neutro se não encontrar
    const text = lifePathCompatibilityText[compatibilityLevel];
    const harmonyScore = (compatibilityLevel / 2) * 90 + Math.floor(Math.random() * 11);
    return {
        title: `Missão de Vida: ${path1} e ${path2}`,
        harmonyScore: Math.min(100, harmonyScore),
        summary: text.summary,
        details: text.details,
    };
}
// --- Função Principal de Sinastria ---
function computeSynastry(input1, input2) {
    // Calcula os dados individuais
    const sunSign1 = (0, astro_1.computeSunSign)(input1.birthDate).sun;
    const sunSign2 = (0, astro_1.computeSunSign)(input2.birthDate).sun;
    const lifePath1 = (0, numerology_1.lifePathFromDate)(input1.birthDate);
    const lifePath2 = (0, numerology_1.lifePathFromDate)(input2.birthDate);
    const arcana1 = (0, arcana_1.getArcanaByNumber)(lifePath1);
    const arcana2 = (0, arcana_1.getArcanaByNumber)(lifePath2);
    // Calcula cada aspecto da compatibilidade
    const sunSignAspect = getSunSignCompatibility(sunSign1, sunSign2);
    const archetypeAspect = (0, archetypeMatrix_1.getArchetypeCompatibility)(arcana1, arcana2);
    const lifePathAspect = getLifePathCompatibility(lifePath1, lifePath2);
    // Calcula a harmonia geral com base nos TRÊS aspectos
    const overallHarmony = Math.round((sunSignAspect.harmonyScore + archetypeAspect.harmonyScore + lifePathAspect.harmonyScore) / 3);
    const finalReport = {
        person1Name: input1.name || "Pessoa 1",
        person2Name: input2.name || "Pessoa 2",
        overallHarmony,
        sunSignAspect,
        archetypeAspect,
        lifePathAspect,
    };
    return finalReport;
}
