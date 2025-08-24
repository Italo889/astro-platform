// src/utils/formatters.ts

/**
 * Formata um valor numérico para o formato de data (DD/MM/AAAA).
 * @param value - O valor a ser formatado.
 * @returns O valor formatado como data.
 */
export const formatDate = (value: string): string => {
  // 1. Remove tudo que não for número.
  const numericValue = value.replace(/\D/g, '');

  // 2. Aplica a máscara DD/MM/AAAA.
  if (numericValue.length <= 2) {
    return numericValue;
  }
  if (numericValue.length <= 4) {
    return `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
  }
  return `${numericValue.slice(0, 2)}/${numericValue.slice(2, 4)}/${numericValue.slice(4, 8)}`;
};

/**
 * Formata um valor numérico para o formato de hora (HH:MM).
 * @param value - O valor a ser formatado.
 * @returns O valor formatado como hora.
 */
export const formatTime = (value: string): string => {
  // 1. Remove tudo que não for número.
  const numericValue = value.replace(/\D/g, '');

  // 2. Aplica a máscara HH:MM.
  if (numericValue.length <= 2) {
    return numericValue;
  }
  return `${numericValue.slice(0, 2)}:${numericValue.slice(2, 4)}`;
};