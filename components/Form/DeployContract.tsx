import React, { useState } from 'react'
import { ethers } from 'ethers'
import {
  abi,
  bytecode,
} from '../../artifacts/contracts/MinterNFT.sol/MinterNFT.json'

export default function DeployContract({
  setContractAddress,
  setState
}: {
  setContractAddress: (contractAddress: string) => void
  setState: (state: "configure") => void
}) {
  const [name, setName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [status, setStatus] = useState<'deploying' | 'none' | 'error' | 'good'>(
    'none'
  )

  const deployContract = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (name =="" || tokenSymbol=="") {
      setStatus('error')
      return;
    }
    e.preventDefault()
    console.log('deploying contract')
    setStatus('deploying')
    const { ethereum } = window as any
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const NFTContract = new ethers.ContractFactory(abi, bytecode, signer)

    const deployContract = await NFTContract.deploy(name, tokenSymbol)

    try {
      setContractAddress(deployContract.address)
      setState("configure")
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
      <button className="btn-primary" onClick={deployContract} disabled={status=="deploying"}>Deploy</button>
      {status=="deploying" && <div>Deploying...</div>}
      {status=="error" && <div>Error</div>}
    </div>
  )
}
