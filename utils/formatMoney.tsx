function formatMoney(amount: number | undefined) {
    if(amount) {
        return '$ ' + amount.toLocaleString('es-CO');
    }
}

export const extractNumberFromString = (str: string): number => {
    const regex = /[0-9]/g;
    const matches = str.match(regex);
    const numberStr = matches?.join('') ?? '';
    const number = Number(numberStr);
    return number;
};

export default formatMoney