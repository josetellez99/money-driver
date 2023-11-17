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
    id?: string,
    type: string,
    date: Date,
    accountFrom: string,
    accountTo: string,
    amount: number,
    description?: string,
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
    month: string;
    userId?: string;
    budgetCategoryId?: string;
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