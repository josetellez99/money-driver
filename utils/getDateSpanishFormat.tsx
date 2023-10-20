export function getDateSpanishFormat(date: Date) {
    let currentDate = date;
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = currentDate.toLocaleDateString('es-ES', options)
    return dateString
}

export function getDateSpanishFormatNumbers(date: Date) {
    let currentDate = date;
    let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateString = currentDate.toLocaleDateString('es-ES', options)
    return dateString
}
