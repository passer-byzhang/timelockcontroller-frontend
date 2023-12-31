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
      <div className="items-center text-xl text-neutral-900"> TimeLock Controller </div>
      <Link className="text-xl text-neutral-900" href='./newTimeLock'> create a new timelock </Link>
      <Link className="text-xl text-neutral-900" href='./myTimeLocks'> my timelock </Link>
    </main>
  </Layout>
)
}

