"use client"; // This is a client component 👈🏽
import Image from 'next/image'
import { useWeb3React } from "@web3-react/core"
import MetaMaskCard from "../components/wallet/ConnectButton"
import Header from '../components/header'
import Link from "next/link"
import Layout  from '../components/Layout';

import UseTransactionToast from '../hooks/useTransactionToast'
export default function Home() {
return(
  <Layout>
    <main className="flex min-h-screen items-center justify-between p-24"> 
      <div className="items-center"> TimeLock Controller </div>
      <Link href='./newTimeLock'> create a new timelock </Link>
      <Link href='./myTimeLocks'> my timelock </Link>
    </main>
  </Layout>
)
}

