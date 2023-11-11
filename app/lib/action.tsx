'use server'

import { PrismaClient } from '@prisma/client'
import { unstable_noStore as noStore } from 'next/cache';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient()

const myUserId = '4f968b8e-0790-488f-8ee9-4ed06509954e'

export async function fetchUserAccounts() {
    noStore()
    try {
        const userAccounts = await prisma.account.findMany({
            where: {
                userId: myUserId,
            }
        });
        return userAccounts;
    } catch (error) {
        console.error("Error fetching user accounts:", error);
        throw error;
    }
}

export async function fetchSingleUserAccount(accountID: string) {
    noStore()
    try {
        const userAccount = await prisma.account.findUnique({
            where: {
                id: accountID,
                userId: myUserId,
            }
        });
        console.log(userAccount)
        return userAccount;
    } catch (error) {
        console.error("Error fetching user accounts:", error);
        throw error;
    }
}


export async function fetchUserBudgetIncome () {
    noStore()
    try {
        const userBudgetIncome = await prisma.budgetCategory.findMany({
            where: {
                type: 'income',
                userId: myUserId,
            }
        });
        return userBudgetIncome;
    } catch (error) {
        console.error("Error fetching user budget income:", error);
        throw error;
    }
}

export async function updateUserAccount(currentAccount: UserAccount, adjustmentTransferInfo: Transaction) {
    noStore()
    await prisma.account.update({
        where: { id: currentAccount.id },
        data: {
            ...currentAccount
        },
    });
    
    await prisma.transaction.create({
        data: {
            ...adjustmentTransferInfo,
            userId: myUserId,
        }
    });

    revalidatePath('/presupuesto-cuentas'); // This make a new request to the server to get the latest data
    redirect('/presupuesto-cuentas'); // This redirects the user to the invoices page
}

export async function deleteUserAccount(accountId: string, adjustmentTransferInfo: Transaction, accountToId: string) {
    noStore()

    await prisma.account.delete({
        where: { id: accountId },
    });
    
    await prisma.transaction.create({
        data: {
            ...adjustmentTransferInfo,
            userId: myUserId,
        }
    });

    await prisma.account.update({
        where: { id: accountToId },
        data: {
            amount: {
                increment: adjustmentTransferInfo.amount,
            }
        },
    })

    revalidatePath('/presupuesto-cuentas'); // This make a new request to the server to get the latest data
    redirect('/presupuesto-cuentas'); // This redirects the user to the invoices page
}

export async function createUserAccount(newAccount: UserAccount) {
    noStore()
    await prisma.account.create({
        data: {
            ...newAccount,
            userId: myUserId,
        }
    });

    revalidatePath('/presupuesto-cuentas'); // This make a new request to the server to get the latest data
    redirect('/presupuesto-cuentas'); // This redirects the user to the invoices page
}