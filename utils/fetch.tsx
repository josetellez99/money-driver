import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function exampleFetch () {

    console.log('Fetching data from database...')

    await prisma.transaction.create({
        data: {
            type: 'Egreso',
            date: new Date(),
            accountFrom: 'Caja',
            accountTo: 'Banco',
            amount: 1000,
            description: 'Pago de nómina',
        },
    })
}

export async function deleteTransactions () {
    await prisma.transaction.deleteMany()
}

export async function deleteAccounts () {
    await prisma.account.deleteMany()
}

export async function createuser () {
    console.log('Creating user...')
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
    console.log('Getting user...')
    const user = await prisma.user.findUnique({
        where: {
            email: 'tellezrojasjosedavid@gmail.com',
        }
    })
    console.log(user)
}

export async function fetchUserAccounts (userID: string) {
    const userAccounts = await prisma.account.findMany({
        where: {
            userId: userID,
        }
    })
    console.log(userAccounts)
}

export async function seedUSerAccounts () {
    await prisma.account.create({
        data: {
            title: 'Efectivo',
            amount: 150500,
            userId: '4f968b8e-0790-488f-8ee9-4ed06509954e',
        },
    })
    await prisma.account.create({
        data: {
            title: 'Nequi',
            amount: 2000500,
            userId: '4f968b8e-0790-488f-8ee9-4ed06509954e',
        },
    })
    await prisma.account.create({
        data: {
            title: 'Daviplata',
            amount: 687500,
            userId: '4f968b8e-0790-488f-8ee9-4ed06509954e',
        },
    })   
}

export async function seedUserBudgetIncome () {
    await prisma.budgetCategory.create({
        data: {
            type: 'income',
            title: 'Salario',
            amount: 1500000,
            userId: '4f968b8e-0790-488f-8ee9-4ed06509954e',
        },
    })
    await prisma.budgetCategory.create({
        data: {
            type: 'income',
            title: 'Inversiones',
            amount: 8000000,
            userId: '4f968b8e-0790-488f-8ee9-4ed06509954e',
        },
    })
    await prisma.budgetCategory.create({
        data: {
            type: 'income',
            title: 'Rentas',
            amount: 500000,
            userId: '4f968b8e-0790-488f-8ee9-4ed06509954e',
        },
    })
    await prisma.budgetCategory.create({
        data: {
            type: 'income',
            title: 'Frelancer',
            amount: 500000,
            userId: '4f968b8e-0790-488f-8ee9-4ed06509954e',
        },
    })
}



export async function deleteAccountByUserId (userId: string) {
    await prisma.account.deleteMany({
        where: {
            userId: userId,
        }
    })
}
