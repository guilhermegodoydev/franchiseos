export function toCapitalizeFirstLetter(str: string) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function toCurrency(value: number, locale: string = "pt-br", currency: string = "BRL") {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        notation: "compact",
        compactDisplay: "short",
    }).format(value);
}