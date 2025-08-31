import type { MajorArcana } from '../types';
import majorArcanaData from '../../data/major_arcana.json'; // Certifique-se que este caminho está correto

// Função interna para reduzir um número para o intervalo do Tarô
function reduceToTarotNumber(n: number): number {
  let currentNum = n;
  while (currentNum > 22) {
    currentNum = currentNum.toString().split("").reduce((sum, digit) => sum + Number(digit), 0);
  }
  return currentNum === 0 ? 22 : currentNum;
}

/**
 * Encontra um Arcano Maior com base em um número de entrada.
 * A função já lida com a redução do número.
 */
export function getArcanaByNumber(inputNumber: number): MajorArcana {
  const reducedNum = reduceToTarotNumber(inputNumber);
  
  // A regra do Louco: se o número final for 22, corresponde ao arcano de id 0.
  const arcanaId = reducedNum === 22 ? 0 : reducedNum;
  
  const arcana = (majorArcanaData as MajorArcana[]).find(a => a.id === arcanaId);

  if (!arcana) {
    throw new Error(`Arcano não encontrado para o número reduzido: ${reducedNum}`);
  }
  return arcana;
}

/**
 * Exporta a lista completa de Arcanos Maiores para ser consumida pela API.
 */
export function getAllMajorArcana(): MajorArcana[] {
  return majorArcanaData as MajorArcana[];
}