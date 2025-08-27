/**
 * Soma todos os dígitos de uma string ou número.
 * Ex: '1998-09-14' -> 1+9+9+8+0+9+1+4 = 41
 */
export function sumAllDigits(input: string | number): number {
  return input.toString().replace(/\D/g, "").split("").reduce((a, b) => a + Number(b), 0);
}

/**
 * Soma dia, mês e ano como números inteiros (Método Greer).
 * Ex: '1996-08-25' -> 1996 + 8 + 25 = 2029
 */
export function sumDateAsIntegers(isoDate: string): number {
  const [year, month, day] = isoDate.split('-').map(Number);
  return day + month + year;
}

/**
 * Calcula a soma para o Arcano Anual usando o ano atual.
 * Ex: '1996-08-25' em 2025 -> 25 + 8 + 2025 = 2058
 */
export function calculateAnnualSum(isoDate: string): number {
  const currentYear = new Date().getFullYear();
  const [, month, day] = isoDate.split('-').map(Number);
  return day + month + currentYear;
}

/**
 * Calcula a soma bruta das letras de um nome (método pitagórico).
 */
export function sumFromName(name: string): number {
  const mapPyth: Record<string, number> = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9, S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8 };
  const normalizedName = name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toUpperCase().replace(/[^A-Z]/g, "");
  return normalizedName.split("").reduce((acc, char) => acc + (mapPyth[char] || 0), 0);
}

/**
 * Reduz um número para um único dígito, preservando os números mestres 11 e 22.
 * Perfeito para a Numerologia Pura.
 */
export function reduceToSingleDigit(n: number): number {
  while (n > 9 && n !== 11 && n !== 22) {
    n = n.toString().split("").reduce((a, b) => a + Number(b), 0);
  }
  return n;
}

/**
 * Reduz um número para o intervalo do Tarô (1-22).
 */
export function reduceToTarotNumber(n: number): number {
  let currentNum = n;
  while (currentNum > 22) {
    currentNum = currentNum.toString().split("").reduce((sum, digit) => sum + Number(digit), 0);
  }
  // Se a redução resultar em 0 (raro, mas possível), mapeamos para 22 (O Louco).
  return currentNum === 0 ? 22 : currentNum;
}


export function reduceForGreerPersonality(n: number): number {
  let reducedNum = reduceToTarotNumber(n); // Usa nossa redução padrão para 1-22

  return reducedNum;
}