import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function deleteTransactions () {
    await prisma.transaction.deleteMany()
}

export async function deleteCategories () {
    await prisma.budgetItem.deleteMany()
}

export async function deletesubCategories () {
    await prisma.budgetItemSubcategory.deleteMany()
}

export async function setStartingMonthStatus () {

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    await prisma.startingMonthStatus.create({
        data: {
            monthAndYear: new Date(currentYear, currentMonth, 1),
            userId: '4f968b8e-0790-488f-8ee9-4ed06509954e',
            availableMoney: 320000
        }
    })
}

export async function deleteAccounts () {
    await prisma.account.deleteMany()
}

export async function createuser () {
    await prisma.user.create({
        data: {
            name: 'Jose David',
            lastname: 'Tellez Rojas',
            email: 'tellezrojasjosedavid@gmail.com',
            password: '123456',
            rol : 'admin',
        }
    })
}

export async function getUser () {
    const user = await prisma.user.findUnique({
        where: {
            email: 'tellezrojasjosedavid@gmail.com',
        }
    })
    return user
}
