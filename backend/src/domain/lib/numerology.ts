// Redução numerológica com preservação de 11/22 como "mestres".
function digitalRoot(n: number, keepMasters = true) {
  while (n > 9 && !(keepMasters && (n === 11 || n === 22))) {
    n = n.toString().split("").reduce((a, b) => a + Number(b), 0);
  }
  return n;
}

export function lifePathFromDate(iso: string) {
  const sum = iso.replace(/\D/g, "").split("").reduce((a, b) => a + Number(b), 0);
  return digitalRoot(sum, true); // retorna 1..9 ou 11/22
}

const mapPyth: Record<string, number> = (() => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const m: Record<string, number> = {};
  for (let i = 0; i < letters.length; i++) m[letters[i]] = (i % 9) + 1;
  return m;
})();

function normalizeName(name: string) {
  return name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
}

export function destinyFromName(name: string) {
  const s = normalizeName(name);
  const total = s.split("").reduce((acc, ch) => acc + (mapPyth[ch] || 0), 0);
  return digitalRoot(total, true); // 1..9 ou 11/22
}
