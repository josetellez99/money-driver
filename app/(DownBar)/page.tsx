import React from 'react'
import ElementTitle from '@/components/ElementTitle'
import MainDefault from '@/components/MainDefault'
import SectionDefault from '@/components/SectionDefault'
import SummaryTable from '@/components/SummaryTable'
import ListOfLinksToPage from '@/components/ListOfLinksToPages'
import SummaryTransactionListServerSide from '@/components/SummaryTransactionListServerSide'
import DownBar from '@/components/DownBar'

const buttonsData = [
  {title: 'Presupuesto y cuentas', href: '/presupuesto-cuentas', iconURL: 'budget-icon.svg'},
  {title: 'Registro', href: '/registros/todos', iconURL: '/register-icon.svg'},
  {title: 'Deudas', href: '/deudas', iconURL: '/debt-icon.svg'},
  {title: 'Ahorros', href:'/ahorros', iconURL: '/saving-icon.svg'}
]

export default function Home() {

  return (
    <>
        <SectionDefault>
          <ElementTitle title='Tus finanzas este mes' />
          <SummaryTable />
        </SectionDefault>
        <SectionDefault>
          <ListOfLinksToPage listButtonsData={buttonsData} />
        </SectionDefault>
        <SectionDefault>
            <SummaryTransactionListServerSide 
              title='Ultimas transacciones'
              transactionsToFetch={{limit: 10}}
            />
        </SectionDefault>
    </>
  )
}
