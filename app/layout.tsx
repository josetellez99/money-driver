import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

import { Header } from '@/components/Header'

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

  return (
    <html lang="en" className='relative'>
      <body className={`${inter.className} p-1`}>
        <Header nombre={'José David Tellez'} userProfileURL="nan" />
        {children}
      </body>
    </html>
  )
}
