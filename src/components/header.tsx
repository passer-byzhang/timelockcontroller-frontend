"use client"; // This is a client component 👈🏽
import Image from 'next/image'
import { useWeb3React } from "@web3-react/core"
import MetaMaskCard from "./wallet/ConnectButton"

export default function Header() {
  return (
      <div className="fixed right-10 top-10">
        <MetaMaskCard/>
      </div>
  )
}
