import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useStatus } from '@cfxjs/use-wallet/dist/ethereum'
import {
  abi,
  bytecode,
} from '../../artifacts/contracts/MinterNFT.sol/MinterNFT.json'
import { validAddress } from '../../util/validAddress'

export default function DeployContract({
  setContractAddress,
  setState,
}: {
  setContractAddress: (contractAddress: string) => void
  setState: (state: 'configure') => void
}) {
  const walletStatus = useStatus()
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [status, setStatus] = useState<'deploying' | 'none' | 'error' | 'good'>(
    'none'
  )

  const deployContract = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (name == '' || tokenSymbol == '') {
      setStatus('error')
      return
    }
    if (walletStatus == 'not-active') {
      setStatus('error')
      return
    }

    console.log('deploying contract')
    setStatus('deploying')
    const { ethereum } = window as any
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const NFTContract = new ethers.ContractFactory(abi, bytecode, signer)

    const deployContract = await NFTContract.deploy(name, tokenSymbol)

    try {
      setContractAddress(deployContract.address)
      setState('configure')
    } catch (e) {
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-input"
      />
      <label>Token Symbol</label>
      <input
        type="text"
        value={tokenSymbol}
        onChange={(e) => setTokenSymbol(e.target.value)}
        className="text-input"
      />
      <button
        className="btn-primary"
        onClick={deployContract}
        disabled={status == 'deploying'}
      >
        Deploy
      </button>
      <p>Or</p>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="text-input"
      />
      <button
        className="btn-primary disabled:bg-gray-500 disabled:hover:bg-gray-600"
        onClick={(e) => {
          e.preventDefault()
          if (!validAddress(address)) {
            setStatus('error')
            return
          }
          setState('configure')
        }}
        disabled={!validAddress(address)}
      >
        Enter
      </button>
      {status == 'deploying' && <div>Deploying...</div>}
      {status == 'error' && <div>Error</div>}
    </div>
  )
}
