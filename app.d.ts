type ButtonData = {
    title: string;
    id?: number,
    href?: string | undefined,
    iconURL?: string | undefined;
    onClick?: () => void;
}

type UserAccount = {
    title: string,
    id?: string,
    amount: number | null,
    UrlIcon?: string,
}

type FormRegisterData = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

type Transaction = {
    id?: string,
    type: string,
    date: Date,
    accountFrom: string,
    accountFromId: string,
    subcategoryFrom?: string | null,
    subcategoryFromId?: string | null,
    accountTo: string,
    accountToId: string,
    subcategoryTo?: string | null,
    subcategoryToId?: string | null,
    amount: number,
    description?: string,
    userId?: string,
}

type Debt = {
    toPay: boolean,
    id: number,
    title: string,
    totalAmount: number,
    paidAmount?: number,
    createdRecordDay: Date,
    debtStartDay: Date,
    description: string,
    paymentPlan?: {
        byMonth: boolean,
        byAmount: boolean,
        monthsToPay?: number,
        monthlyRate: boolean,
        yearlyRate: boolean,
        ratePercentage: number,
        monthToStartToPay: Date
    }
    paymentRecord: DebtPaymentRecord
}

// Example for debt element

// {
//     toPay: false,
//     id: 5,
//     title: 'Tarjeta de credito para pagar por todas las cosas que adquirí cuando me vine a vivir a esta hermosa ciudad',
//     totalAmount: 40,
//     paidAmount: 30,
//     createdRecordDay: new Date(),
//     debtStartDay: new Date(),
//     description: 'Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir',
//     paymentPlan: {
//         byMonths: true,
//         byAmount: false,
//         monthsToPay: 10,
//         monthlyRate: false,
//         yearlyRate: true,
//         ratePercentage: 40,
//         monthToStartToPay: new Date
//     },
//     paymentRecord : {
        
//     }
// },

type DebtPaymentRecord = {
    idTransaction: number;
    debtID: number,
    paymentDate: Date,
    amount: number,
    description: string
}

type BudgetItem = {
    id?: string;
    title: string;
    type: string;
    amount: number;
    used: number;
    remaining: number;
    month?: Date;
    userId?: string;
    subcategories?: BudgetItem[];
}

type PairValue = {
    title: string;
    value: number;
}

type CreditCardData = {
    id: number;
    title: string;
    transactionsThisCohorte?: Transaction[];
    used: number;
}