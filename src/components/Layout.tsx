import '../app/globals.css'
import type { Metadata } from 'next'
import { ReactElement } from 'react';
import { Inter } from 'next/font/google'
import Header from '../components/header'
import UseTransactionToast from '../hooks/useTransactionToast'
const inter = Inter({ subsets: ['latin'] })

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>
        <Header/>
        <div className={inter.className}>{children}</div>
      </>
  )
}