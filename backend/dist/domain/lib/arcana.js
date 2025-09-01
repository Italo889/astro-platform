"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArcanaByNumber = getArcanaByNumber;
exports.getAllMajorArcana = getAllMajorArcana;
const major_arcana_json_1 = __importDefault(require("../../data/major_arcana.json")); // Certifique-se que este caminho está correto
// Função interna para reduzir um número para o intervalo do Tarô
function reduceToTarotNumber(n) {
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
function getArcanaByNumber(inputNumber) {
    const reducedNum = reduceToTarotNumber(inputNumber);
    // A regra do Louco: se o número final for 22, corresponde ao arcano de id 0.
    const arcanaId = reducedNum === 22 ? 0 : reducedNum;
    const arcana = major_arcana_json_1.default.find(a => a.id === arcanaId);
    if (!arcana) {
        throw new Error(`Arcano não encontrado para o número reduzido: ${reducedNum}`);
    }
    return arcana;
}
/**
 * Exporta a lista completa de Arcanos Maiores para ser consumida pela API.
 */
function getAllMajorArcana() {
    return major_arcana_json_1.default;
}
