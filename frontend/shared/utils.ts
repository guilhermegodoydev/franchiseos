export function formatCurrency(value: number, format: "full" | "compact" = "compact") {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: format === "compact" ? 0 : 2,
        maximumFractionDigits: 2,
        notation: format === "compact" ? "compact" : "standard",
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

export function formatDate(iso: string | null) {
    if (!iso) return "--";
    return new Date(iso).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}