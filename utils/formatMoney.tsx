function formatMoney(amount: number | undefined) {
    // Check if amount is a number and exits to return the formatted amount
    if(typeof amount == 'number') {
        return '$' + amount.toLocaleString('es-CO');
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