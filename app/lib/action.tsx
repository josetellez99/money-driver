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

export async function fetchBudgetcategory(budgetID: string) {
    noStore()
    try {
        const budgetCategory = await prisma.budgetItem.findUnique({
            where: {
                id: budgetID,
            }
        });
        return budgetCategory;
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

    // Our table in the database is not expecting "subcategories" so we need to remove it before updating the database

    const { subcategories, ...categoryWithoutSucategories } = currentCategory;

    // Update the .amount and .remaining of the parent category based on the subcategories

    const newAmount = subcategories?.reduce((acc, subcategory) => acc + subcategory.amount!, 0)
    const totalUsed = subcategories?.reduce((acc, subcategory) => acc + subcategory.used!, 0)
    const newRemaining =  newAmount! - totalUsed!

    categoryWithoutSucategories.amount = newAmount!
    categoryWithoutSucategories.remaining = newRemaining

    // Modify the database with all the information updated

    await prisma.budgetItem.update({
        where: { id: categoryWithoutSucategories.id },
        data: { ...categoryWithoutSucategories },
    });

    // We need to separate the subcategories that are already in the database from the new ones that the user created when editing the budget category
    // The subcategories that are already in the database have an id that is longer than 7 characters
    // The subcategories that are new have an id created in the frontend to handle them in the frontend, but they don't have an id in the database yet

    const subcategoriesToUpdate = subcategories!.filter(subcategory => subcategory.id!.length > 7)
    const subcategoriesToCreate = subcategories!.filter(subcategory => subcategory.id!.length < 7)

    if(subcategoriesToUpdate.length > 0) {
        for (const subcategory of subcategoriesToUpdate) {
            // We need to update the .remaining of the subcategory based on the .amount and .used
            const newRemaining = subcategory.amount! - subcategory.used!
            await prisma.budgetItemSubcategory.update({
                where: { id: subcategory.id },
                data: {
                    ...subcategory,
                    remaining: newRemaining,
                }
            });
        }
        createBudgetSubcategories(subcategoriesToCreate, currentCategory)
    }

    revalidatePath('/presupuesto-cuentas');
    redirect('/presupuesto-cuentas')
}

export async function deleteBudgetCategory(currentCategory: BudgetItem) {
    noStore()
    
    if(currentCategory.subcategories!.length > 0) {
        await prisma.budgetItemSubcategory.deleteMany({
            where: {
                budgetCategoryId: currentCategory.id,
            }
        });
    }

    await prisma.budgetItem.delete({
        where: { id: currentCategory.id },
    });

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

    if(subcategories!.length > 0) {
        createBudgetSubcategories(subcategories!, createdCategory)
    }


    revalidatePath('/presupuesto-cuentas');
    redirect('/presupuesto-cuentas')
}

async function createBudgetSubcategories(subcategoriesToCreate: BudgetItem[], parentCategory: BudgetItem) {
    noStore()

    await Promise.all(subcategoriesToCreate!.map( subcategory => 
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
    ));

    revalidatePath('/presupuesto-cuentas');
    redirect('/presupuesto-cuentas')
}

// Accounts actions

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

export async function createUserAccount(newAccount: UserAccount, adjustmentTransferInfo: Transaction, accountFromId: string) {
    noStore()

    await prisma.account.create({
        data: {
            ...newAccount,
            userId: myUserId,
        }
    });

    await prisma.transaction.create({
        data: {
            ...adjustmentTransferInfo,
            userId: myUserId,
        }
    });

    if(adjustmentTransferInfo.type === 'movement') {
        await prisma.account.update({
            where: { id: accountFromId },
            data: {
                amount: {
                    decrement: adjustmentTransferInfo.amount,
                }
            },
        })
    }

    revalidatePath('/presupuesto-cuentas'); // This make a new request to the server to get the latest data
    redirect('/presupuesto-cuentas'); // This redirects the user to the invoices page
}