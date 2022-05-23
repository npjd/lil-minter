import React from 'react'
import {
  connect,
  useChainId,
  useStatus,
  switchChain,
} from '@cfxjs/use-wallet/dist/ethereum'

export default function ConnectWallet({
  setState,
}: {
  setState: (state: 'connect' | 'configure' | 'confirm' |'deploy') => void
}) {
  const status = useStatus()
  const chainId = useChainId()

  const connectWallet = () => {
    connect()
      .then(() => {
        console.log('connected')
        if (chainId !== undefined && chainId == '1030') {
          setState("deploy")
        }
      })
      .catch((error) => {
        console.log('connection failed')
      })
  }

  const swicthToeSpace = () => {
    switchChain('0x406')
      .then(() => {
        setState("deploy")
      })
      .catch((error) => {
        console.log('switch failed')
      })
  }

  return (
    <div>
      {status !== 'active' ? (
        <button className="btn-primary" onClick={() => connectWallet()}>
          Connect Wallet
        </button>
      ) : (
        <button className="btn-primary" onClick={() => swicthToeSpace()}>
          Switch Chain to eSpace
        </button>
      )}
    </div>
  )
}
