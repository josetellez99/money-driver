import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function incomeCase (newTransaction: Transaction) {

    try {
        // Updating the category
        await prisma.budgetItem.update({
            where: { id: newTransaction.accountFromId },
            data: {
                used: {
                    increment: newTransaction.amount,
                },
                remaining: {
                    decrement: newTransaction.amount,
                }
            },
        })

        // Updating the subcategory if it exists
        if(newTransaction.subcategoryFromId) {
            await prisma.budgetItemSubcategory.update({
                where: { id: newTransaction.subcategoryFromId },
                data: {
                    used: {
                        increment: newTransaction.amount,
                    },
                    remaining: {
                        decrement: newTransaction.amount,
                    }
                },
            })
        }

        // Updating the account
        await prisma.account.update({
            where: { id: newTransaction.accountToId },
            data: {
                amount: {
                    increment: newTransaction.amount,
                }
            },
        })

    } catch (error) {
        throw error
    }
}

export async function expenseCase(newTransaction: Transaction) {
    try {
        // Updating the category
        await prisma.budgetItem.update({
            where: { id: newTransaction.accountToId },
            data: {
                used: {
                    increment: newTransaction.amount,
                },
                remaining: {
                    decrement: newTransaction.amount,
                }
            },
        })

        // Updating the subcategory if it exists
        if(newTransaction.subcategoryToId) {
            await prisma.budgetItemSubcategory.update({
                where: { id: newTransaction.subcategoryToId },
                data: {
                    used: {
                        increment: newTransaction.amount,
                    },
                    remaining: {
                        decrement: newTransaction.amount,
                    }
                },
            })
        }

        // Updating the account
        await prisma.account.update({
            // where: { id: newTransaction.accountFromId }, this is throwing an error
            where: { id: newTransaction.accountFromId },
            data: {
                amount: {
                    decrement: newTransaction.amount,
                }
            },
        })

    } catch (error) {
        console.log(error)
        throw error
    }
}