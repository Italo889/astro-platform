// Em: src/domain/lib/nameAnalysis.ts

// --- MÉTODO 1: NUMEROLOGIA CABALÍSTICA (Tabela 1-9) ---

const CABALISTIC_VALUES: Record<string, number> = {
  'A': 1, 'J': 1, 'S': 1, 'Y': 1,
  'B': 2, 'K': 2, 'T': 2,
  'C': 3, 'G': 3, 'L': 3, 'Ç': 3,
  'D': 4, 'M': 4,
  'E': 5, 'H': 5, 'N': 5, 'X': 5,
  'U': 6, 'V': 6, 'W': 6,
  'O': 7, 'Z': 7,
  'F': 8, 'P': 8, 'Q': 8,
  'I': 9, 'R': 9,
};

// Para este método, removemos os acentos.
function normalizeForCabalistic(name: string): string {
  return name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Z]/g, "");
}

export function calculateCabalisticArcanum(fullName: string): number {
  const cleanName = normalizeForCabalistic(fullName);
  const sum = Array.from(cleanName).map(char => CABALISTIC_VALUES[char] || 0).reduce((total, value) => total + value, 0);
  return reduceToArcanum(sum);
}


// --- MÉTODO 2: GEMATRIA CLÁSSICA (Sua Tabela) ---

const GEMATRIA_VALUES: Record<string, number> = {
  'A':1, 'Á':1, 'À':1, 'Â':1, 'Ä':1, 'Ã':41,
  'B':2, 'C':3, 'Ç':3, 'D':4,
  'E':5, 'É':5, 'È':5, 'Ê':5, 'Ë':5,
  'F':6, 'G':7, 'H':8,
  'I':9, 'J':9, 'Y':9, 'Í':9, 'Ì':9, 'Î':9, 'Ï':9, 'Ý':9,
  'K':10, 'L':20, 'M':30, 'N':40, 'Ñ':80,
  'O':50, 'Ó':50, 'Ò':50, 'Ô':50, 'Ö':50, 'Õ':90,
  'P':60, 'Q':70, 'R':80, 'S':90, 'T':100,
  'U':200, 'V':200, 'W':200, 'Ú':200, 'Ù':200, 'Û':200, 'Ü':200,
  'X':300, 'Z':400
};

// Para este método, mantemos os acentos.
function normalizeForGematria(name: string): string {
  return name.toUpperCase().replace(/[^A-ZÀ-ÿ]/g, '');
}

export function calculateGematriaArcanum(fullName: string): number {
  const cleanName = normalizeForGematria(fullName);
  const sum = Array.from(cleanName).map(char => GEMATRIA_VALUES[char] || 0).reduce((total, value) => total + value, 0);
  return reduceToArcanum(sum);
}


// --- FUNÇÃO AUXILIAR COMUM ---

// Esta função é usada por ambos os métodos.
function reduceToArcanum(num: number): number {
  while (num > 22) {
    num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num === 0 ? 1 : num; 
}