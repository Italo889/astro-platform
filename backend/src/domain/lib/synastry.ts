// src/domain/lib/synastry.ts

import type { BirthInput, SynastryReport, SunSign, CompatibilityAspect, MajorArcana } from '../types';
import { computeSunSign } from './astro';
import { lifePathFromDate } from './numerology';
import { getArcanaByNumber } from './arcana';
import { getArchetypeCompatibility } from './archetypeMatrix';

// --- Lógica de Compatibilidade dos Signos ---

// MATRIZ CORRIGIDA E COMPLETA: Cada linha agora contém todos os 12 signos, resolvendo o erro de tipo.
const signCompatibilityMatrix: Record<SunSign, Record<SunSign, number>> = {
  'Áries':       { 'Áries': 1, 'Touro': 0, 'Gêmeos': 2, 'Câncer': 0, 'Leão': 2, 'Virgem': 1, 'Libra': 1, 'Escorpião': 0, 'Sagitário': 2, 'Capricórnio': 0, 'Aquário': 2, 'Peixes': 1 },
  'Touro':       { 'Áries': 0, 'Touro': 2, 'Gêmeos': 1, 'Câncer': 2, 'Leão': 0, 'Virgem': 2, 'Libra': 1, 'Escorpião': 1, 'Sagitário': 0, 'Capricórnio': 2, 'Aquário': 0, 'Peixes': 2 },
  'Gêmeos':      { 'Áries': 2, 'Touro': 1, 'Gêmeos': 2, 'Câncer': 1, 'Leão': 2, 'Virgem': 0, 'Libra': 2, 'Escorpião': 1, 'Sagitário': 1, 'Capricórnio': 0, 'Aquário': 2, 'Peixes': 0 },
  'Câncer':      { 'Áries': 0, 'Touro': 2, 'Gêmeos': 1, 'Câncer': 2, 'Leão': 1, 'Virgem': 2, 'Libra': 0, 'Escorpião': 2, 'Sagitário': 1, 'Capricórnio': 1, 'Aquário': 1, 'Peixes': 2 },
  'Leão':        { 'Áries': 2, 'Touro': 0, 'Gêmeos': 2, 'Câncer': 1, 'Leão': 2, 'Virgem': 1, 'Libra': 2, 'Escorpião': 0, 'Sagitário': 2, 'Capricórnio': 1, 'Aquário': 1, 'Peixes': 0 },
  'Virgem':      { 'Áries': 1, 'Touro': 2, 'Gêmeos': 0, 'Câncer': 2, 'Leão': 1, 'Virgem': 2, 'Libra': 1, 'Escorpião': 2, 'Sagitário': 0, 'Capricórnio': 2, 'Aquário': 1, 'Peixes': 1 },
  'Libra':       { 'Áries': 1, 'Touro': 1, 'Gêmeos': 2, 'Câncer': 0, 'Leão': 2, 'Virgem': 1, 'Libra': 2, 'Escorpião': 1, 'Sagitário': 2, 'Capricórnio': 0, 'Aquário': 2, 'Peixes': 1 },
  'Escorpião':   { 'Áries': 0, 'Touro': 1, 'Gêmeos': 1, 'Câncer': 2, 'Leão': 0, 'Virgem': 2, 'Libra': 1, 'Escorpião': 2, 'Sagitário': 1, 'Capricórnio': 2, 'Aquário': 0, 'Peixes': 2 },
  'Sagitário':   { 'Áries': 2, 'Touro': 0, 'Gêmeos': 1, 'Câncer': 1, 'Leão': 2, 'Virgem': 0, 'Libra': 2, 'Escorpião': 1, 'Sagitário': 2, 'Capricórnio': 1, 'Aquário': 2, 'Peixes': 0 },
  'Capricórnio': { 'Áries': 0, 'Touro': 2, 'Gêmeos': 0, 'Câncer': 1, 'Leão': 1, 'Virgem': 2, 'Libra': 0, 'Escorpião': 2, 'Sagitário': 1, 'Capricórnio': 2, 'Aquário': 1, 'Peixes': 2 },
  'Aquário':     { 'Áries': 2, 'Touro': 0, 'Gêmeos': 2, 'Câncer': 1, 'Leão': 1, 'Virgem': 1, 'Libra': 2, 'Escorpião': 0, 'Sagitário': 2, 'Capricórnio': 1, 'Aquário': 2, 'Peixes': 1 },
  'Peixes':      { 'Áries': 1, 'Touro': 2, 'Gêmeos': 0, 'Câncer': 2, 'Leão': 0, 'Virgem': 1, 'Libra': 1, 'Escorpião': 2, 'Sagitário': 0, 'Capricórnio': 2, 'Aquário': 1, 'Peixes': 2 },
};

const compatibilityText = [
  { summary: "Uma dinâmica de grande desafio e aprendizado.", details: "Suas energias solares operam em frequências muito diferentes, o que pode gerar atritos. A chave para o sucesso é um esforço consciente para entender e respeitar as perspectivas um do outro, transformando o desafio em crescimento." },
  { summary: "Uma conexão com potencial para complementaridade.", details: "Embora não haja uma harmonia natural imediata, suas energias não são diretamente opostas. Esta é uma relação de aprendizado, onde as diferenças podem se tornar forças se ambos estiverem dispostos a se adaptar e aprender um com o outro." },
  { summary: "Uma forte harmonia natural e fluidez.", details: "Suas essências solares vibram em sintonia, criando uma conexão fácil e de grande apoio mútuo. A compreensão é quase intuitiva, e juntos vocês potencializam as melhores qualidades um do outro." },
];

function getSunSignCompatibility(sign1: SunSign, sign2: SunSign): CompatibilityAspect {
  const compatibilityLevel = signCompatibilityMatrix[sign1][sign2];
  const text = compatibilityText[compatibilityLevel];
  const harmonyScore = (compatibilityLevel / 2) * 90 + Math.floor(Math.random() * 11);

  return {
    title: `Harmonia Solar: ${sign1} e ${sign2}`,
    harmonyScore: Math.min(100, harmonyScore),
    summary: text.summary,
    details: text.details,
  };
}

export function computeSynastry(input1: BirthInput, input2: BirthInput): SynastryReport {
  const sunSign1 = computeSunSign(input1.birthDate).sun;
  const sunSign2 = computeSunSign(input2.birthDate).sun;

  const lifePath1 = lifePathFromDate(input1.birthDate);
  const lifePath2 = lifePathFromDate(input2.birthDate);

  const arcana1 = getArcanaByNumber(lifePath1);
  const arcana2 = getArcanaByNumber(lifePath2);

  const sunSignAspect = getSunSignCompatibility(sunSign1, sunSign2);
  const archetypeAspect = getArchetypeCompatibility(arcana1, arcana2);

  const overallHarmony = Math.round((sunSignAspect.harmonyScore + archetypeAspect.harmonyScore) / 2);

  const finalReport: SynastryReport = {
      person1Name: input1.name || "Pessoa 1",
      person2Name: input2.name || "Pessoa 2",
      overallHarmony,
      sunSignAspect,
      archetypeAspect,
      lifePathAspect: {
          title: '',
          harmonyScore: 0,
          summary: '',
          details: ''
      }
  };

  return finalReport;
}