"use client"; // This is a client component 👈🏽
import Image from 'next/image'
import { useWeb3React } from "@web3-react/core"
import { Button } from '@material-ui/core';
import {TimelockFactory__factory} from '../abis/types/factories'
import { useEffect, useState } from 'react';
import {BrowserProvider,ContractTransactionResponse} from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function useCreateTimelock(){

  const provider = new BrowserProvider(window.ethereum)
  console.log("metamask connected: " + provider!=null)
  
  async function createTimelock(){
    const TimeLockFactoryContract = TimelockFactory__factory.connect('0x2d9a7E973e736A65DdA7Ca86E4338c96Aa8bdA1a',await provider.getSigner());
    return TimeLockFactoryContract.createTimeLock(
      0,
      ["0xFC2C3a4C78fE133D5E548eCE54b3848b2696fAb8"],
      ["0xFC2C3a4C78fE133D5E548eCE54b3848b2696fAb8"],
      "0xFC2C3a4C78fE133D5E548eCE54b3848b2696fAb8"
    );
  }
}
