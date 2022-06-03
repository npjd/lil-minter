import React from 'react'
import {
  connect,
  useChainId,
  useStatus,
  switchChain,
  useAccount,
} from '@cfxjs/use-wallet/dist/ethereum'

export default function ConnectWallet() {
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  const address = useAccount()
  const status = useStatus()
  const chainId = useChainId()

  const truncateAddress = (address: string | undefined) => {
    if (address == undefined) {
      console.log('Error finding address')
      return
    }
    const match = address.match(truncateRegex)
    if (!match) return address
    return `${match[1]}…${match[2]}`
  }

  const renderButton = () => {
    if (chainId == '1030' || chainId == '71') {
      return (
        <button className="btn-primary  bg-green-500 hover:bg-green-600">
          {truncateAddress(address)}
        </button>
      )
    } else {
      return (
        <button className="btn-primary" onClick={() => switchChain('0x406')}>
          Switch Chain to eSpace
        </button>
      )
    }
  }

  return (
    <div>
      {status !== 'active' ? (
        <button className="btn-primary" onClick={connect}>
          Connect Wallet
        </button>
      ) : (
        <>{renderButton()}</>
      )}
    </div>
  )
}
