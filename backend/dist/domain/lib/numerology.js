"use strict";
// src/domain/lib/numerology.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumAllDigits = sumAllDigits;
exports.sumDateAsIntegers = sumDateAsIntegers;
exports.calculateAnnualSum = calculateAnnualSum;
exports.sumFromName = sumFromName;
exports.reduceToSingleDigit = reduceToSingleDigit;
exports.reduceToTarotNumber = reduceToTarotNumber;
exports.reduceForGreerPersonality = reduceForGreerPersonality;
exports.lifePathFromDate = lifePathFromDate;
function sumAllDigits(input) {
    return input.toString().replace(/\D/g, "").split("").reduce((a, b) => a + Number(b), 0);
}
function sumDateAsIntegers(isoDate) {
    const [year, month, day] = isoDate.split('-').map(Number);
    return day + month + year;
}
function calculateAnnualSum(isoDate) {
    const currentYear = new Date().getFullYear();
    const [, month, day] = isoDate.split('-').map(Number);
    return day + month + currentYear;
}
function sumFromName(name) {
    const mapPyth = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9, S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8 };
    const normalizedName = name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toUpperCase().replace(/[^A-Z]/g, "");
    return normalizedName.split("").reduce((acc, char) => acc + (mapPyth[char] || 0), 0);
}
function reduceToSingleDigit(n) {
    while (n > 9 && n !== 11 && n !== 22) {
        n = n.toString().split("").reduce((a, b) => a + Number(b), 0);
    }
    return n;
}
function reduceToTarotNumber(n) {
    let currentNum = n;
    while (currentNum > 22) {
        currentNum = currentNum.toString().split("").reduce((sum, digit) => sum + Number(digit), 0);
    }
    return currentNum === 0 ? 22 : currentNum;
}
function reduceForGreerPersonality(n) {
    return reduceToTarotNumber(n);
}
// --- FUNÇÕES ADICIONAIS PARA SINASTRIA ---
/**
 * Reduz um número até um único dígito ou um Número Mestre (11, 22, 33).
 * Específico para o cálculo do Caminho de Vida.
 */
function reduceToLifePathNumber(num) {
    // Se o número já for um Mestre, não o reduzimos.
    if (num === 11 || num === 22 || num === 33) {
        return num;
    }
    // Se for maior que 9, continua o processo de redução.
    while (num > 9) {
        num = num
            .toString()
            .split('')
            .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        // Após uma redução, verifica novamente se o resultado é um Mestre.
        if (num === 11 || num === 22 || num === 33) {
            return num;
        }
    }
    return num;
}
/**
 * Calcula o número do Caminho de Vida a partir de uma data de nascimento.
 */
function lifePathFromDate(birthDate) {
    // A soma de todos os dígitos da data (ex: "1996-08-25")
    const sum = sumAllDigits(birthDate);
    // Reduz a soma para o número final do Caminho de Vida
    return reduceToLifePathNumber(sum);
}
