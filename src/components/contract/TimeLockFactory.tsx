"use client"; // This is a client component 👈🏽
import Image from 'next/image'
import { useWeb3React } from "@web3-react/core"
import { Button,TextField,FormControl,FormHelperText,Input,InputLabel} from '@material-ui/core';
import {useForm,SubmitHandler} from 'react-hook-form';
import {TimelockFactory__factory} from '../../abis/types/factories'
import { useEffect, useState ,SyntheticEvent} from 'react';
import {BrowserProvider,ContractTransactionResponse} from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContractTransaction, ContractReceipt } from '@ethersproject/contracts';
import * as ethers from 'ethers';

type createTimeLockArgs={
  minDelay:number,
  proposers:string[],
  executors:string[],
  admin:string
}

async function createTimeLock(args:createTimeLockArgs){
  const provider = new BrowserProvider(window.ethereum)
  //const x = provider.getTransaction('0x0e4deafc63a7712dd29818fe9ef0833d325d39bf323be89a82c6c21acdda4112');
  const TimeLockFactoryContract = TimelockFactory__factory.connect('0x2d9a7E973e736A65DdA7Ca86E4338c96Aa8bdA1a',await provider.getSigner());
  const hash =  (await TimeLockFactoryContract.createTimeLock(
    args.minDelay,
    args.proposers,
    args.executors,
    args.admin
  )).hash;
  return provider.waitForTransaction(hash).then((receipt) => {
    return receipt as ethers.ethers.TransactionReceipt
  });
}

export function CreateNewTimeLockForm() {

  const [args,setArgs]= useState<createTimeLockArgs>(
    {
      minDelay:0,
      proposers:[''],
      executors:[''],
      admin:''
    }
  );

  useEffect(() => {
    console.log("CreateNewTimeLockButton")
  }, [])

const notify = (transactionResponse:Promise<ethers.ethers.TransactionReceipt>) => toast.promise(transactionResponse, {
  pending: {
    render(){
        return "Transaction Pending"
      },
  },
  success: {
    render({data}){
        return `Transaction ${(data as ethers.ethers.TransactionReceipt).hash} successed!`
      },
  },
  error: {
    render({data}){
        // When the promise reject, data will contains the error
        return `Err : ${data}`
      }
  }
});

const handleAdminChange = (value:string) => {
  // 更新输入框数组中对应的值
  setArgs({...args, admin:value})
};

const handleMinDelayChange = (value:number) => {
  // 更新输入框数组中对应的值
  setArgs({...args, minDelay:value})
};


const handleExecutorsChange = (index:number, value:string) => {
  // 更新输入框数组中对应的值
  const newInputValues = args.executors;
  newInputValues[index] = value;
  setArgs({...args, executors:newInputValues})
};

const handleExecutorsInput = () => {
  // 新增一个空的输入框
  const newInputValues = args.executors;
  newInputValues.push('');
  setArgs({...args, executors:newInputValues})
};

const handleRemoveExecutors = (index:number) => {
  // 删除对应的输入框
  const newInputValues = args.executors;;
  newInputValues.splice(index, 1);
  setArgs({...args, executors:newInputValues})
};


const handleProposersChange = (index:number, value:string) => {
  // 更新输入框数组中对应的值
  const newInputValues = args.proposers;
  newInputValues[index] = value;
  setArgs({...args, proposers:newInputValues})
};

const handleProposersInput = () => {
  // 新增一个空的输入框
  const newInputValues = args.proposers;
  newInputValues.push('');
  setArgs({...args, proposers:newInputValues})
};

const handleRemoveProposers = (index:number) => {
  // 删除对应的输入框
  const newInputValues = args.proposers;;
  newInputValues.splice(index, 1);
  setArgs({...args, proposers:newInputValues})
};



const handleSubmit = (event:SyntheticEvent) => {
  event.preventDefault();
  notify(createTimeLock(args)) // 提交表单时输出所有输入框的值
};
//

return (
    <>
  <div className="justify-center">
    <form onSubmit={handleSubmit}>
    <div>
    <Input
            type="text"
            color="secondary"
            onChange={(event) => handleAdminChange(event.target.value)}
          />
    </div>

    <div>
    <Input
            type="text"
            color="secondary"
            onChange={(event) => handleMinDelayChange(+event.target.value)}
          />
    </div>

        {args.proposers.map((value, index) => (
        <div key={index}>
          <Input
            type="text"
            color="secondary"
            value={value}
            onChange={(event) => handleProposersChange(index, event.target.value)}
          />
          <button type="button" onClick={() => handleRemoveProposers(index)}>
            删除
          </button>
        </div>
      ))}
      <Button type="button" onClick={handleProposersInput}>
        增加输入框
      </Button>

      {args.executors.map((value, index) => (
        <div key={index}>
          <Input
            type="text"
            color="secondary"
            value={value}
            onChange={(event) => handleExecutorsChange(index, event.target.value)}
          />
          <button type="button" onClick={() => handleRemoveExecutors(index)}>
            删除
          </button>
        </div>
      ))}
      <Button type="button" onClick={handleExecutorsInput}>
        增加输入框
      </Button>
        <Button
            onClick={()=>{notify(createTimeLock(args))}}
            color="secondary"
        >{"create new timelock"}</Button>

      <button type="submit">提交</button>

   </form>
  
  </div>
   <ToastContainer/>
   </>
  )
}
