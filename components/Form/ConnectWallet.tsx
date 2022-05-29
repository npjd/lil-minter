import React from 'react'
import {
  connect,
  useChainId,
  useStatus,
  switchChain,
} from '@cfxjs/use-wallet/dist/ethereum'

export default function ConnectWallet() {
  const status = useStatus()

  return (
    <div>
      {status !== 'active' ? (
        <button className="btn-primary" onClick={connect}>
          Connect Wallet
        </button>
      ) : (
        <button className="btn-primary" onClick={() => switchChain('0x406')}>
          Switch Chain to eSpace
        </button>
      )}
    </div>
  )
}
