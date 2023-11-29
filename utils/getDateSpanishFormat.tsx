export function getDateSpanishFormat(date: Date) {
    let currentDate = date;
    const dateString = currentDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    return dateString
}

export function getDateSpanishFormatNumbers(date: Date) {
    let currentDate = date;
    const dateString = currentDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    return dateString
}

export const getSpanishFormatFromDatabaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
}