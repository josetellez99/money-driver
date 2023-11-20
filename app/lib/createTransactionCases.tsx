import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function incomeCase (newTransaction: Transaction) {

    console.log('entramoooooooos al incomeCase')

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
}