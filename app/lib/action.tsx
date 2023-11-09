import { PrismaClient } from '@prisma/client'
import { unstable_noStore as noStore } from 'next/cache';

const prisma = new PrismaClient()

export async function fetchUserAccounts(userID: string) {
    noStore()
    try {
        const userAccounts = await prisma.account.findMany({
            where: {
                userId: userID,
            }
        });
        return userAccounts;
    } catch (error) {
        console.error("Error fetching user accounts:", error);
        throw error;
    }
}


export async function fetchUserBudgetIncome (userID: string) {
    noStore()
    try {
        const userBudgetIncome = await prisma.budgetCategory.findMany({
            where: {
                type: 'income',
                userId: userID,
            }
        });
        return userBudgetIncome;
    } catch (error) {
        console.error("Error fetching user budget income:", error);
        throw error;
    }
}