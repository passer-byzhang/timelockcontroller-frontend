import { useEffect, useState ,useContext,createContext} from 'react'
import { MetaMask } from '@web3-react/metamask'
import { MAINNET_CHAINS } from './chains'
import { hooks, metaMask } from './metamask'
import { ConnectWithSelect } from './ConnectWithSelect'
import {AccountContext} from '../../hooks/web3'
const CHAIN_IDS = Object.keys(MAINNET_CHAINS).map(Number)

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

export default function MetaMaskCard() {
    const accounts = useAccounts()
    const isActivating = useIsActivating()
  
    const isActive = useIsActive()
  
    const provider = useProvider()
  
    const [error, setError] = useState<Error>()
    const accountContext = useContext(AccountContext);
    // attempt to connect eagerly on mount
    useEffect(() => {
        metaMask.connectEagerly().catch((error) => {
        console.debug('Failed to connect eagerly to metamask', error)
      })
    }, [])

    return (
      <>
        <ConnectWithSelect    
          connector={metaMask}
          isActivating={isActivating}
          isActive={isActive}
          error={error}
          setError={setError}
          accounts={accounts}
        />
      </>
    )
  }