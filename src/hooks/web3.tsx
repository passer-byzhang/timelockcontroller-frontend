import {
	JsonRpcProvider,
	JsonRpcSigner,
	StaticJsonRpcProvider,
	Web3Provider,
} from '@ethersproject/providers';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { createContext, Dispatch, useEffect, SetStateAction, useState,useContext } from 'react';

export interface Web3ContextValue {
	chainId: number;
	account: string | null;
	provider: JsonRpcProvider;
	signer: JsonRpcSigner | null;
}
export const Web3Context = createContext<Web3ContextValue | null>(null);

interface IAccountContext {
    account: string|undefined;
    setAccount: Dispatch<SetStateAction<string|undefined>>;
  }
  
export const AccountContext = createContext<IAccountContext>({
    account:undefined,
    setAccount:()=>{}
});
export function useWeb3State() {
	const web3State = useContext(Web3Context);

	if (!web3State) {
		throw new Error('Web3 hooks must be wrapped in a <Web3ContextProvider>');
	}
	return web3State;
}
export function useAccountContext(){
    const accountContext = useContext(AccountContext);
	if (!accountContext) {
		throw new Error('accountContext hooks must be wrapped in a <Web3ContextProvider>');
	}
	console.log('Using account context: '+accountContext)
	return accountContext;
}
