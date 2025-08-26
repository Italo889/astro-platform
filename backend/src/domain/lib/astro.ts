// src/domain/lib/astro.ts

import type { AstrologyResult, SunSign } from '../../../backend/src/domain/types';

// O tipo de dados para nossos ranges, inferido do 'as const'
type SignRange = {
  readonly sign: SunSign;
  readonly from: string; // MM-DD
  readonly to: string;   // MM-DD
};

// A estrutura de dados está perfeita.
const ranges: readonly SignRange[] = [
  { sign: "Áries",       from: "03-21", to: "04-19" },
  { sign: "Touro",       from: "04-20", to: "05-20" },
  { sign: "Gêmeos",      from: "05-21", to: "06-20" },
  { sign: "Câncer",      from: "06-21", to: "07-22" },
  { sign: "Leão",        from: "07-23", to: "08-22" },
  { sign: "Virgem",      from: "08-23", to: "09-22" },
  { sign: "Libra",       from: "09-23", to: "10-22" },
  { sign: "Escorpião",   from: "10-23", to: "11-21" },
  { sign: "Sagitário",   from: "11-22", to: "12-21" },
  { sign: "Capricórnio", from: "12-22", to: "01-19" },
  { sign: "Aquário",     from: "01-20", to: "02-18" },
  { sign: "Peixes",      from: "02-19", to: "03-20" },
] as const;

// A sua função 'inRange' é muito elegante e funciona perfeitamente para a comparação de strings.
function inRange(md: string, from: string, to: string): boolean {
  // Se o 'from' é menor que o 'to', é um intervalo normal (ex: 03-21 a 04-19).
  // Se não, é um intervalo que cruza o ano (Capricórnio: 12-22 a 01-19).
  return from <= to ? (md >= from && md <= to) : (md >= from || md <= to);
}

/**
 * Calcula o signo solar a partir de uma data de nascimento no formato ISO.
 * @param isoBirthDate - A data no formato "YYYY-MM-DD".
 * @returns Um objeto AstrologyResult contendo o signo solar.
 */
export function computeSunSign(isoBirthDate: string): AstrologyResult {
  // CORREÇÃO: Extraímos o mês e o dia diretamente da string,
  // evitando completamente o objeto Date e seus problemas de fuso horário.
  // "1998-09-14" -> "09-14"
  const md = isoBirthDate.substring(5);

  const hit = ranges.find(r => inRange(md, r.from, r.to));

  // Adicionando uma verificação de segurança para o caso de não encontrar
  // (substitui o '!' para um código mais robusto).
  if (!hit) {
    throw new Error(`Não foi possível determinar o signo para a data: ${isoBirthDate}`);
  }

  return { sun: hit.sign };
}