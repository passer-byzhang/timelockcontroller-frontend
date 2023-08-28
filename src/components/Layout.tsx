import '../app/globals.css'
import type { Metadata } from 'next'
import { ReactElement,useState } from 'react';
import { Inter } from 'next/font/google'
import Header from '../components/header'
import UseTransactionToast from '../hooks/useTransactionToast'
import {AccountContext} from'../hooks/web3';

const inter = Inter({ subsets: ['latin'] })

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const [account, setAccount] = useState<string>();
  const web3ProviderVaule = { account, setAccount };
  return (
      <AccountContext.Provider value={web3ProviderVaule}>
        <Header/>
        <div className={inter.className}>{children}</div>
      </AccountContext.Provider>
  )
}