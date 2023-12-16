import React from 'react'
import MainDefault from '@/components/MainDefault'
import DownBar from '@/components/DownBar'

export default function RootLayout({
    children,
    }: {
        children: React.ReactNode
    }) {

        console.log('Second layout')

    return (
        <MainDefault
            paddingForDownBar={true}
        >
            {children}
            <DownBar />
        </MainDefault>
    )
}