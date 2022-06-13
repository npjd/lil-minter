import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useStatus } from '@cfxjs/use-wallet/dist/ethereum'
import {
  abi,
  bytecode,
} from '../../artifacts/contracts/MinterNFT.sol/MinterNFT.json'
import { validAddress } from '../../util/validAddress'
import { useAlert } from 'react-alert'

export default function DeployContract({
  setContractAddress,
  setState,
}: {
  setContractAddress: (contractAddress: string) => void
  setState: (state: 'configure') => void
}) {
  const alert = useAlert()
  const walletStatus = useStatus()
  const [setting, setSetting] = useState<'deploy' | 'import' | ''>('')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [deploying, setDeploying] = useState(false)

  const deployContract = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setDeploying(true)
    if (name == '' || tokenSymbol == '') {
      alert.error('Please enter a name and token symbol')
      setDeploying(false)
      return
    }
    if (walletStatus == 'not-active') {
      alert.error('Please connect wallet')
      setDeploying(false)
      return
    }

    console.log('deploying contract')
    alert.info('Deploying contract...')
    const { ethereum } = window as any
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const NFTContract = new ethers.ContractFactory(abi, bytecode, signer)

    try {
      const deployContract = await NFTContract.deploy(name, tokenSymbol)
      setContractAddress(deployContract.address)
      setState('configure')
    } catch (e) {
      alert.error('An error occurred when deploying contract')
    }
    setDeploying(false)
  }

  const renderSetting = () => {
    if (setting == 'deploy') {
      return (
        <>
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
            disabled={deploying}
          >
            Deploy
          </button>
        </>
      )
    } else if (setting == 'import') {
      return (
        <>
          <input
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value)
              setContractAddress(e.target.value)
            }}
            className="text-input"
          />
          <button
            className="btn-primary disabled:bg-gray-500 disabled:hover:bg-gray-600"
            onClick={(e) => {
              e.preventDefault()
              if (!validAddress(address)) {
                alert.error('Invalid address')
                return
              }
              setState('configure')
            }}
            disabled={!validAddress(address)}
          >
            Enter
          </button>
        </>
      )
    } else {
      return (
        <div className="flex flex-row justify-center space-x-4">
          <button
            className="btn-primary"
            onClick={() => {
              setSetting('deploy')
            }}
          >
            Deploy A New Contract
          </button>
          <button
            className="btn-primary"
            onClick={() => {
              setSetting('import')
            }}
          >
            Import an Existing Contract
          </button>
        </div>
      )
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      {renderSetting()}
      {(setting == 'deploy' || setting == 'import') && (
        <button
          className="btn-primary bg-red-500 hover:bg-red-600"
          onClick={() => {
            setSetting('')
          }}
        >
          Back
        </button>
      )}
    </div>
  )
}
