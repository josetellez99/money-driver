import React from 'react'
import ElementTitle from '@/components/ElementTitle'
import MainDefault from '@/components/MainDefault'
import SectionDefault from '@/components/SectionDefault'
import SummaryTable from '@/components/SummaryTable'
import ListOfLinksToPage from '@/components/ListOfLinksToPages'
import SummaryTransactionList from '@/components/SummaryTransactionList'
import Summarytransaction from '@/components/SummaryTransaction'

import { exampleFetch, deleteTransactions, createuser, getUser } from '@/utils/fetch'

const buttonsData = [
  {title: 'Presupuesto y cuentas', href: '/presupuesto-cuentas', iconURL: 'budget-icon.svg'},
  {title: 'Registro', href: '/registro', iconURL: '/register-icon.svg'},
  {title: 'Deudas', href: '/deudas', iconURL: '/debt-icon.svg'},
  {title: 'Ahorros', href:'/ahorros', iconURL: '/saving-icon.svg'}
]

const transactions = [
  {
    type: 'Ingreso',
    date: '03 / 10 / 2023',
    accountFrom: 'Sueldo en Rappi',
    accountTo: 'Bancolombia',
    amount: 2000000,
    description: 'Esta es la primera quincena del mes y me encanta este trabajo'
  },
  {
    type: 'Egreso',
    date: '03 / 10 / 2023',
    accountFrom: 'Arriendo',
    accountTo: 'Efectivo',
    amount: 480000,
    description: 'Bueno, toca pagar por donde vivir'
  },
  {
    type: 'Egreso',
    date: '03 / 10 / 2023',
    accountFrom: 'Comida',
    accountTo: 'Nequi',
    amount: 30000,
    description: 'Vamos a hacer almuerzo'
  },
  {
    type: 'Egreso',
    date: '03 / 10 / 2023',
    accountFrom: 'Arriendo',
    accountTo: 'Efectivo',
    amount: 480000,
    description: 'Bueno, toca pagar por donde vivir'
  },
  {
    type: 'Egreso',
    date: '03 / 10 / 2023',
    accountFrom: 'Arriendo',
    accountTo: 'Efectivo',
    amount: 480000,
    description: 'Bueno, toca pagar por donde vivir'
  },
  {
    type: 'Egreso',
    date: '03 / 10 / 2023',
    accountFrom: 'Arriendo',
    accountTo: 'Efectivo',
    amount: 480000,
    description: 'Bueno, toca pagar por donde vivir'
  },
  {
    type: 'Egreso',
    date: '03 / 10 / 2023',
    accountFrom: 'Arriendo',
    accountTo: 'Efectivo',
    amount: 480000,
    description: 'Bueno, toca pagar por donde vivir'
  },
]

export default function Home() {

  return (
    <>
      <MainDefault>
        <SectionDefault>
          <ElementTitle title='Resumen de tus finanzas' />
          <SummaryTable />
        </SectionDefault>
        <SectionDefault>
          <ListOfLinksToPage listButtonsData={buttonsData} />
        </SectionDefault>
        <SectionDefault>
          <ElementTitle title='Ultimas transacciones' />
          <SummaryTransactionList>
          {transactions.map( transaction => (
                    <Summarytransaction
                        transactionData={transaction}
                    />
                ))}
          </SummaryTransactionList>
        </SectionDefault>
      </MainDefault>
    </>
  )
}
