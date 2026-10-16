export const MONTHS: Record<any, string> = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro'
};

export const CURRENT_YEAR = 2026;
export const YEARS = Array.from({ length: 7 }, (_, i) => {
  const year = String(CURRENT_YEAR - 5 + i);
  return { label: year, value: year };
}).reverse();

export const CONFIG_MASKS = {
  cpf: "000.000.000-00",
  cnpj: "00.000.000/0000-00",
  telefone: "(00) 00000-0000",
  cep: "00000-000",
} as const;