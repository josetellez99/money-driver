'use server'

import { PrismaClient } from '@prisma/client'
import { unstable_noStore as noStore } from 'next/cache';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { incomeCase, expenseCase, movementCase } from '@/app/lib/createTransactionCases';
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

const myUserId = '4f968b8e-0790-488f-8ee9-4ed06509954e'

// SOME DOCS

//cookies().set('showConfirmationMessage', 'whatever message', { expires: 4 / (24 * 60 * 60) });
// This set a cookie which is used to show a confirmation message in the frontend and desappear after 4 seconds

// await prisma.$transaction([createTransaction, updateAccount]);
// This is an example of how to use transactions in prisma, where you can update two or more tables at the same time and if one of them fails, the other one is not updated
// This is always inside a try and catch to handle errors, set the correct cookies







// accounts actions

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
        return userAccount;
    } catch (error) {
        console.error("Error fetching user accounts:", error);
        throw error;
    }
}


export async function updateUserAccount(currentAccount: UserAccount, adjustmentTransferInfo: Transaction) {
    noStore()

    try {
        const updateAccount = prisma.account.update({
            where: { id: currentAccount.id },
            data: {
                ...currentAccount,
            },
        });

        if(adjustmentTransferInfo.type === 'movement') {
            const createTransaction = prisma.transaction.create({
                data: {
                    ...adjustmentTransferInfo,
                    userId: myUserId,
                }
            });
        
            await prisma.$transaction([createTransaction, updateAccount]);
        } else {
            await prisma.$transaction([updateAccount]);
        }

        cookies().set('showConfirmationMessage', 'La cuenta se ha actualizado correctamente', { expires: 4 / (24 * 60 * 60) });
    } catch (error) {

        cookies().set('showConfirmationMessage', 'Error', { expires: 4 / (24 * 60 * 60) });
    }
        
        revalidatePath('/presupuesto-cuentas');
        redirect('/presupuesto-cuentas')
}


export async function deleteUserAccount( adjustmentTransferInfo: Transaction, accountToId: string) {
    noStore()

    try {
        const deleteAccount = prisma.account.delete({
            where: { id: adjustmentTransferInfo.accountFromId },
        });

        const createTransaction = prisma.transaction.create({
            data: {
                ...adjustmentTransferInfo,
                userId: myUserId,
            }
        });

        // When accountToId is 'ajuste de cuenta' we don't need to update that account because it doesn't exist as account in the database.
        if(adjustmentTransferInfo.accountTo !== 'Ajuste de cuenta') {
            const updateAccount = prisma.account.update({
                where: { id: adjustmentTransferInfo.accountToId },
                data: {
                    amount: {
                        increment: adjustmentTransferInfo.amount,
                    }
                },
            })
            await prisma.$transaction([createTransaction, updateAccount, deleteAccount]);
        } else {
            await prisma.$transaction([createTransaction, deleteAccount]);
        }

        cookies().set('showConfirmationMessage', 'La cuenta se ha eliminado correctamente', { expires: 4 / (24 * 60 * 60) });
    } catch (error) {
        cookies().set('showConfirmationMessage', 'Error', { expires: 4 / (24 * 60 * 60) });
    }

    revalidatePath('/presupuesto-cuentas'); // This make a new request to the server to get the latest data
    redirect('/presupuesto-cuentas'); // This redirects the user to the invoices page
}

export async function createUserAccount(newAccount: UserAccount, adjustmentTransferInfo: Transaction, accountFromId: string) {
    noStore()

    //If there an error in the following code, the completly app will crash. No account will be created
    const createdAccount = await prisma.account.create({
        data: {
            ...newAccount,
            userId: myUserId,
        }
    });
    
    // The try and catch is needed to delete the account if there's an error in the following code
    try {
        const createTransaction =  prisma.transaction.create({
            data: {
                ...adjustmentTransferInfo,
                userId: myUserId,
                accountTo: createdAccount.title,
                accountToId: createdAccount.id,
            }
        });
    
        if(adjustmentTransferInfo.type === 'movement') {
            const updateAccount =  prisma.account.update({
                where: { id: accountFromId },
                data: {
                    amount: {
                        decrement: adjustmentTransferInfo.amount,
                    }
                },
            })
            await prisma.$transaction([createTransaction, updateAccount]);
        }
    
        await prisma.$transaction([createTransaction]);
        
        cookies().set('showConfirmationMessage', 'La cuenta se ha creado correctamente', { expires: 4 / (24 * 60 * 60) });

    } catch (error) {

        await prisma.account.delete({
            where: { id: createdAccount.id },
        });

        cookies().set('showConfirmationMessage', 'Error', { expires: 4 / (24 * 60 * 60) });
    }

    revalidatePath('/presupuesto-cuentas'); // This make a new request to the server to get the latest data
    redirect('/presupuesto-cuentas'); // This redirects the user to the invoices page
}











// budgets actions

export async function fetchUserBudget (type: 'income' | 'expense') {
    noStore()
    try {
        const userBudgetIncome = await prisma.budgetItem.findMany({
            where: {
                type: type,
                userId: myUserId,
            }
        });
        return userBudgetIncome;
    } catch (error) {
        console.error("Error fetching user budget income:", error);
        throw error;
    }
}

export async function fetchUserBudgetSubcategories (type: 'income' | 'expense') {
    noStore()
    try {
        const userBudgetIncomeSubcategories = await prisma.budgetItemSubcategory.findMany({
            where: {
                type: type,
                userId: myUserId,
            }
        });
        return userBudgetIncomeSubcategories;
    } catch (error) {
        console.error("Error fetching user budget income subcategories:", error);
        throw error;
    }
}

export async function fetchUserBudgetWithSubcategories (type: 'income' | 'expense') {
    noStore()
    const [budgetData, subcategoriesBudgetData] = await Promise.all([
        fetchUserBudget(type),
        fetchUserBudgetSubcategories(type)
    ])

    // Inserting the subcategories into the corresponding parent category
    subcategoriesBudgetData?.map( subcategory => {
        budgetData.map( parentCategory => {
            if (parentCategory.id === subcategory.budgetCategoryId) {
                parentCategory.subcategories = parentCategory.subcategories || []
                parentCategory.subcategories = [...parentCategory.subcategories, subcategory]
            }
        })
    })

    return budgetData
}

export async function fetchBudgetcategory(budgetID: string) {
    noStore()
    try {
        const budgetCategory = await prisma.budgetItem.findUnique({
            where: {
                id: budgetID,
            }
        });
        return budgetCategory as BudgetItem;
    } catch (error) {
        console.error("Error fetching user budget income:", error);
        throw error;
    }
}

export async function fetchBudgetSubcategoriesbyParentID (budgetCategoryId: string) {
    noStore()
    try {
        const budgetSubcategories = await prisma.budgetItemSubcategory.findMany({
            where: {
                budgetCategoryId: budgetCategoryId,
            }
        });
        return budgetSubcategories;
    } catch (error) {
        console.error("Error fetching user budget income:", error);
        throw error;
    }

}

export async function fetchSingleBudgetCategoryWithSubcategories (budgetID: string) {

    const [budgetData, subcategoriesData] = await Promise.all([
        fetchBudgetcategory(budgetID),
        fetchBudgetSubcategoriesbyParentID(budgetID)
    ])

    budgetData.subcategories = subcategoriesData

    return budgetData
}


export async function updateUSerBudgetCategory(currentCategory: BudgetItem) {
    noStore()

    try {
        
    // Our table in the database is not expecting "subcategories" so we need to remove it before updating the database
    const { subcategories, ...categoryWithoutSucategories } = currentCategory;

    // we need to updated the .amount and .remaining of the parent category based on there exits subcategories or not
    if(subcategories!.length > 0) {
        // Update the .amount and .remaining of the parent category based on the subcategories
        const newAmount = subcategories?.reduce((acc, subcategory) => acc + subcategory.amount!, 0)
        const totalUsed = subcategories?.reduce((acc, subcategory) => acc + subcategory.used!, 0)
        const newRemaining =  newAmount! - totalUsed!
    
        categoryWithoutSucategories.amount = newAmount!
        categoryWithoutSucategories.remaining = newRemaining
    } else {
        // If there's no subcategories, the .amount is the same and .remaining is .amount - .used
        categoryWithoutSucategories.remaining = currentCategory.amount - currentCategory.used
    }

    console.log(categoryWithoutSucategories)
    // No estoy entendiendo por qué no se actualiza el .amount de la categoria padre si en el console.log de arriba si está actualizada

    // Modify the parent category table with all the information updated
    const updateCategory = prisma.budgetItem.update({
        where: { id: categoryWithoutSucategories.id },
        data: { ...categoryWithoutSucategories },
    });

    // We need to separate the subcategories that are already in the database from the new ones that the user created when editing the budget category
    // The subcategories that are already in the database have an id that is longer than 7 characters
    const subcategoriesToUpdate = subcategories!.filter(subcategory => subcategory.id!.length > 7)
    const subcategoriesToCreate = subcategories!.filter(subcategory => subcategory.id!.length < 7)

    if(subcategoriesToUpdate.length > 0) {
        const updateSubcategoryPromises = subcategoriesToUpdate.map(subcategory => {
            // We need to update the .remaining of the subcategory based on the .amount and .used
            const newRemaining = subcategory.amount! - subcategory.used!
            return prisma.budgetItemSubcategory.update({
                where: { id: subcategory.id },
                data: {
                    ...subcategory,
                    remaining: newRemaining,
                }
            });
        });

        const createSubcategoryPromises = subcategoriesToCreate!.map(subcategory => 
            prisma.budgetItemSubcategory.create({
                data: {
                    type: currentCategory.type,
                    title: subcategory.title,
                    amount: subcategory.amount,
                    used: 0,
                    remaining: subcategory.amount,
                    budgetCategoryId: currentCategory.id!,
                    userId: myUserId,
                }
            })
        );

        await prisma.$transaction([updateCategory, ...updateSubcategoryPromises, ...createSubcategoryPromises]);
    } else {
        await prisma.$transaction([updateCategory]);
    }

        cookies().set('showConfirmationMessage', 'La categoria se ha actualizado correctamente', { expires: 4 / (24 * 60 * 60) });
    } catch (error) {
        cookies().set('showConfirmationMessage', 'Error', { expires: 4 / (24 * 60 * 60) });
    }

    revalidatePath('/presupuesto-cuentas');
    redirect('/presupuesto-cuentas')
}


export async function deleteBudgetCategory(currentCategory: BudgetItem) {
    noStore()

    try {
        
        if(currentCategory.subcategories!.length > 0) {
            const deleteSubcategories = prisma.budgetItemSubcategory.deleteMany({
                where: {
                    budgetCategoryId: currentCategory.id,
                }
            });
            const deleteCategory = prisma.budgetItem.delete({
                where: { id: currentCategory.id },
            });
            await prisma.$transaction([deleteSubcategories, deleteCategory]);
        } else {   
            await prisma.budgetItem.delete({
                where: { id: currentCategory.id },
            });
        }

        cookies().set('showConfirmationMessage', 'La categoria se ha eliminado correctamente', { expires: 4 / (24 * 60 * 60) });
    } catch (error) {
        console.error("Error deleting budget category:", error);
        cookies().set('showConfirmationMessage', 'Error', { expires: 4 / (24 * 60 * 60) });
    }
    

    revalidatePath('/presupuesto-cuentas');
    redirect('/presupuesto-cuentas')
}

export async function createBudgetCategory(newCategory: BudgetItem) {
    noStore()

    
    const { subcategories, ...categoryWithoutSucategories } = newCategory;
    
    const createdCategory = await prisma.budgetItem.create({
        data: {
            ...categoryWithoutSucategories,
            userId: myUserId,
        }
    });

    try {
        if(subcategories!.length > 0) {
            createBudgetSubcategories(subcategories!, createdCategory)
        }
        cookies().set('showConfirmationMessage', 'Categoria creada correctamente', { expires: 4 / (24 * 60 * 60) });
    } catch (error) {
        await prisma.budgetItem.delete({
            where: { id: createdCategory.id },
        });
        cookies().set('showConfirmationMessage', 'Error', { expires: 4 / (24 * 60 * 60) });
    }
        

    revalidatePath('/presupuesto-cuentas');
    redirect('/presupuesto-cuentas')
}

async function createBudgetSubcategories(subcategoriesToCreate: BudgetItem[], parentCategory: BudgetItem) {
    noStore()

    const createSubcategoryPromises = subcategoriesToCreate!.map(subcategory => 
        prisma.budgetItemSubcategory.create({
            data: {
                type: parentCategory.type,
                title: subcategory.title,
                amount: subcategory.amount,
                used: 0,
                remaining: subcategory.amount,
                budgetCategoryId: parentCategory.id!,
                userId: myUserId,
            }
        })
    );

    await prisma.$transaction(createSubcategoryPromises);
}







// transactions actions

export async function createNewTransaction (newTransaction: Transaction) {
    noStore()
    
    try {
        // Into the following funcitons, the databse is modify and the transaction is created. 
        // If there's an error, it throw the error, catch is triggered and return null, transaction and any change is made

        if(newTransaction.type === 'income') {
            const createdTransaction = await incomeCase(newTransaction as Transaction, myUserId)
            return createdTransaction

        } else if (newTransaction.type === 'expense') {
            const createdTransaction = await expenseCase(newTransaction as Transaction, myUserId)
            return createdTransaction

        } else if (newTransaction.type === 'movement') {
            const createdTransaction = await movementCase(newTransaction as Transaction, myUserId)
            return createdTransaction

        }        
        
    } catch (error) {
        return null
    }
}

export async function fetchUserTransactions (type: string, limit: number) {
    noStore()

    // if type is 'all' it will fetch all the transactions, if not, it will fetch only the transactions of the type specified
    try {
        const userTransactions = await prisma.transaction.findMany({
            where: {
                userId: myUserId,
                ...(type !== 'all' && { type: type }),
            },
            take: limit,
            orderBy: {
                date: 'desc',
            },
        });
        return userTransactions;
    } catch (error) {
        console.error("Error fetching user transactions:", error);
        throw error;
    }
}




// Other actions

export async function calculateTotalAmountThisMonth(type: 'income' | 'expense') {
    noStore()

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    try {
        const total = await prisma.transaction.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                type: type,
                date: {
                    gte: new Date(currentYear, currentMonth, 1),
                    lt: new Date(currentYear, currentMonth + 1, 1),
                },
            },
        });
        return total._sum.amount;
    } catch (error) {
        console.error("Error calculating total amount:", error);
        throw error;
    }
}

export async function calculateTotalAmountInAccounts() {
    noStore()

    try {
        const total = await prisma.account.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                userId: myUserId,
            },
        });

        return total._sum.amount;
    } catch (error) {
        console.error("Error calculating total amount in account:", error);
        throw error;
    }
}