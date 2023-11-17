export default function setMonthForBudgetItem () {
    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const formattedDate = `${month.toLowerCase()} ${year}`;
    return formattedDate
}