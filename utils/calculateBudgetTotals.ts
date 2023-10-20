const calculateBudgetTotals = (budget: BudgetItem[]) => {

    let totals = []
    
    const totalAmount = budget.reduce((acc, item) => {
        return acc + item.amount
    }, 0)
    totals.push(totalAmount)

    const totalUsed = budget.reduce((acc, item) => {
        return acc + item.used
    }, 0)
    totals.push(totalUsed)

    const totalRemaining = budget.reduce((acc, item) => {
        return acc + item.remaining
    }, 0)
    totals.push(totalRemaining)

    return totals
}

export default calculateBudgetTotals