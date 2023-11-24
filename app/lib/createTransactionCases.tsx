import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function incomeCase (newTransaction: Transaction, myUserId: string) {
    try {
        // Creating the transaction
        const createTransaction = prisma.transaction.create({
            data: {
                ...newTransaction,
                userId: myUserId,
            }
        });
        // Updating the category
        const updateCategory = prisma.budgetItem.update({
            where: { id: newTransaction.accountFromId },
            data: {
                used: {
                    increment: newTransaction.amount,
                },
                remaining: {
                    decrement: newTransaction.amount,
                }
            },
        });
        // Updating the account
        const updateAccount = prisma.account.update({
            where: { id: newTransaction.accountToId },
            data: {
                amount: {
                    increment: newTransaction.amount,
                }
            },
        });
        // If there is a subcategory, update it and then make the complete databse transaction to store all items
        if(newTransaction.subcategoryFromId) {
            const updateSubcategory = prisma.budgetItemSubcategory.update({
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
            await prisma.$transaction([createTransaction, updateCategory, updateSubcategory, updateAccount]);
        } else {
            await prisma.$transaction([createTransaction, updateCategory, updateAccount]);
        }

    } catch (error) {
        throw error;
    }
}

export async function expenseCase(newTransaction: Transaction, myUserId: string) {
    try {
          // Creating the transaction
        const createTransaction = prisma.transaction.create({
            data: {
                ...newTransaction,
                userId: myUserId,
            }
        });
        // Updating the category
        const updateCategory = prisma.budgetItem.update({
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
        // Updating the account
        const updateAccount = prisma.account.update({
            where: { id: newTransaction.accountFromId },
            data: {
                amount: {
                    decrement: newTransaction.amount,
                }
            },
        })
        // If there is a subcategory, update it and then make the complete databse transaction to store all items
        if(newTransaction.subcategoryToId) {
            const updateSubcategory = prisma.budgetItemSubcategory.update({
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
            await prisma.$transaction([createTransaction, updateCategory, updateSubcategory, updateAccount]);
        } else {
            await prisma.$transaction([createTransaction, updateCategory, updateAccount]);
        }

    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function movementCase(newTransaction: Transaction, myUserId: string) {
    try {
        // Creating the transaction
        const createTransaction = prisma.transaction.create({
            data: {
                ...newTransaction,
                userId: myUserId,
            }
        });
        // Updating the account from
        const updateAccountFrom = prisma.account.update({
            where: { id: newTransaction.accountFromId },
            data: {
                amount: {
                    decrement: newTransaction.amount,
                }
            },
        })
        // Updating the account to
        const updateAccountTo = prisma.account.update({
            where: { id: newTransaction.accountToId },
            data: {
                amount: {
                    increment: newTransaction.amount,
                }
            },
        })

        await prisma.$transaction([createTransaction, updateAccountFrom, updateAccountTo]);
        

    } catch (error) {
        throw error
    }
}