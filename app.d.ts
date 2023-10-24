type ButtonData = {
    title: string;
    id: number,
    href?: string | undefined,
    iconURL?: string | undefined;
    onClick?: () => void;
}

type UserAccount = {
    title: string,
    id: number
    amount: number,
    UrlIcon?: string,
}

type FormRegisterData = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

type Transaction = {
    type: string,
    date: string,
    accountFrom: string,
    accountTo: string,
    amount: number,
    description?: string
}

type Debt = {
    toPay: boolean,
    debtID: number,
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

type DebtPaymentRecord = {
    idTransaction: number;
    debtID: number,
    paymentDate: Date,
    amount: number,
    description: string
}

type BudgetItem = {
    id: number;
    title: string;
    amount: number;
    used: number;
    remaining: number;
    subcategories?: BudgetItem[];
}

type PairValue = {
    title: string;
    value: number;
}