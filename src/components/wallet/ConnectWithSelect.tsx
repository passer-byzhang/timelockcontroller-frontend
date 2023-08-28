
import type { Web3ReactHooks } from '@web3-react/core'

import { Button } from '@material-ui/core';
import { MetaMask } from '@web3-react/metamask'
import { useCallback, useEffect, useState ,useContext} from 'react'
import {AccountContext} from '../../hooks/web3'
import { CHAINS, getAddChainParameters } from './chains'

async function connectWallet(connector:MetaMask,setError:(error: Error | undefined) => void){
    console.log("try to connect")
    connector
    .activate(1)
    .then(() => setError(undefined))
    .catch(setError)
    console.log("try to connect 16")
}


export function ConnectWithSelect({
  connector,
  accounts,
  isActivating,
  isActive,
  error,
  setError,
}: {
  connector:  MetaMask
  accounts: string[] | undefined
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
  error: Error | undefined
  setError: (error: Error | undefined) => void
}) {
  const accountContext = useContext(AccountContext);
  // attempt to connect eagerly on mount
  useEffect(() => {
    accountContext.setAccount(accounts==undefined?undefined:accounts[0])
  }, [accountContext,accounts])


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '1rem' }} />
      {isActive&& accounts!=undefined ? (
          <Button color="secondary">
            {String(accounts[0]).substring(0,6) + "..."+String(accounts[0]).substring(40)}
          </Button>
        )
       : (  
        <Button
          onClick={()=>{connectWallet(connector,setError)}}
          disabled={isActivating}
          color="secondary"
        >
          {error ? 'Try again?' : 'Connect'}
        </Button>
      )}
    </div>
  )
}