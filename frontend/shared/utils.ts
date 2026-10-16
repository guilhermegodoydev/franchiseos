export function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        notation: "compact",
    }).format(value);
}

export function validateCep(rawCep: string): string | null {
    if (!rawCep) return null;

    const cleanedCep = rawCep.replace(/\D/g, "");

    const cepRegex = /^[0-9]{8}$/;

    if (!cepRegex.test(cleanedCep)) {
        return null;
    }

    return cleanedCep;
}