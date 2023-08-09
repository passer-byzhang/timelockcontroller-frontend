"use client"; // This is a client component 👈🏽
import Image from 'next/image'
import { useWeb3React } from "@web3-react/core"
import { Button } from '@material-ui/core';
import {TimelockFactory__factory} from '../abis/types/factories'
import { useEffect, useState } from 'react';
import {BrowserProvider,ContractTransactionResponse} from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function useTransactionToast(transactionResponse:Promise<ContractTransactionResponse>){
    const notify = () => toast.promise(transactionResponse, {
      pending: {
        render(){
            return "Transaction Pending"
          },
      },
      success: {
        render({data}){
            return `Transaction ${(data as ContractTransactionResponse).hash} successed!`
          },
      },
      error: {
        render({data}){
            // When the promise reject, data will contains the error
            return `Err : ${data}`
          }
      }
    });
    notify();
    return (
      <>
        <ToastContainer
      />
    </>
    )
}
