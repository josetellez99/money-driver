import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import MainDefault from '@/components/MainDefault'
import DownBar from '@/components/DownBar'

import { Header } from '@/components/Header'
import ElementTitle from '@/components/ElementTitle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Money Driver',
  description: 'Get your finances under control',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  console.log('Root layout')

  return (
    <html lang="en" className='relative'>
      <body className={`${inter.className} p-1`}>
        <Header nombre={'José David Tellez'} userProfileURL="nan" />
        <section className='section'>
          <div className='container'> 
            <ElementTitle title='Desktop version is comming soon...' />
          </div>
          <div className='content'>
            {children}
          </div>
          <div className='container'>
            <ElementTitle title='Desktop version is comming soon...' />
          </div>
        </section>
      </body>
    </html>
  )
}