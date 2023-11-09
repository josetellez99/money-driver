import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

import DownBar from '@/components/DownBar'
import RegisterButton from '@/components/DownBar/RegisterButton'
import { Header } from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Money Driver',
  description: 'Get your finances under control',
}

const dataTest = [
  {title: 'Ingreso', href: 'registrar/Ingreso', id: 1},
  {title: 'Egreso', href: 'registrar/Egreso', id: 2},
  {title: 'Movimiento', href: 'registrar/Movimiento', id: 3},
  {title: 'Deuda', href: 'registrar/Deuda', id: 4},
  {title: 'Ahorro', href: 'registrar/Ahorro', id: 5},
  {title: 'Tarjeta de credito', href: 'registrar/Tarjeta-de-credito', id: 6}
]

const myUserId = '4f968b8e-0790-488f-8ee9-4ed06509954e'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className='relative'>
      <body className={`${inter.className} p-1 mb-[70px]`}>
        <Header nombre={'José David Tellez'} userProfileURL="nan" />
        {children}
        <DownBar>
          <RegisterButton buttonsDataList={dataTest} />
        </DownBar>
      </body>
    </html>
  )
}
