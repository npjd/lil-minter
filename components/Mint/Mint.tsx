import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import NFT from '../../types/NFT'
import { abi } from '../../artifacts/contracts/MinterNFT.sol/MinterNFT.json'
import { useAlert } from 'react-alert'
import {
  useChainId,
  useStatus,
  connect,
  switchChain,
} from '@cfxjs/use-wallet/dist/ethereum'
import { sliceIntoChunks } from '../../util/sliceIntoChunks'
import { get, set } from 'idb-keyval'
import { validAddress } from '../../util/validAddress'

export default function Mint({
  nfts,
  address,
  setAddress,
}: {
  nfts: NFT[]
  address: string
  setAddress: (address: string) => void
}) {
  const [minting, setMinting] = useState<boolean>(false)
  const alert = useAlert()
  const [status, setStatus] = useState<'success' | 'error' | ''>('')
  const walletStatus = useStatus()
  const chainId = useChainId()
  const [lastTransactionHash, setLastTransactionHash] = useState<string>('')

  const getScanUrl = () => {
    if (chainId == '71') {
      return 'https://evmtestnet.confluxscan.io/tx/' + lastTransactionHash
    } else if (chainId == '1030') {
      return 'https://evm.confluxscan.io/tx/' + lastTransactionHash
    }
  }

  const mintNFTs = async () => {
    if (!(chainId == '1030' || chainId == '71')) {
      alert.info('Changing to eSpace chain...')
      await switchChain('0x406')
    }
    setMinting(true)
    alert.info('Minting NFTs...')
    const startingIndex = (await get('mintingIndex')) || 0
    const { ethereum } = window as any
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const toAddresses = sliceIntoChunks(
      nfts.map((nft) => nft.address),
      50
    )
    const uris = sliceIntoChunks(
      nfts.map((nft) => nft.uri),
      50
    )
    const contract = new ethers.Contract(address, abi, signer)
    try {
      for (let ii = startingIndex; ii < uris.length; ii++) {
        const currentRecipientBatch = toAddresses[ii]
        const currentUriBatch = uris[ii]

        const val = await contract.batchMint(
          currentRecipientBatch,
          currentUriBatch
        )
        console.log(val)
        alert.success(`Minted batch ${ii + 1} of ${uris.length}`)
        await set('mintingIndex', ii + 1)
        if (ii == uris.length - 1) {
          setLastTransactionHash(val.hash)
        }
      }

      setMinting(false)
      alert.success('Minted!')
      setStatus('success')
      await set('mintingIndex', 0)
    } catch (e) {
      console.log(e)
      setMinting(false)
      alert.error('Error minting NFTs')
      setStatus('error')
    }
  }
  const render = () => {
    if (minting) {
      return <h1>Minting...</h1>
    } else {
      if (status == 'success') {
        return (
          <h1>
            Minting Successful! Check out your contract on scan{' '}
            <a
              className="underline text-blue-500 hover:text-blue-800 visited:text-purple-600 hover:cursor-pointer"
              href={getScanUrl()}
            >
              {' '}
              here
            </a>
          </h1>
        )
      } else {
        return (
          <div>
            {walletStatus == 'active' ? (
              status == 'error' ? (
                <div className="flex flex-col space-y-2">
                  <h1>Minting Failed</h1>
                  <h2>
                    The current target contract address is {address}. Please
                    switch this if the contract address is incorrect
                  </h2>
                  <input
                    className="text-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {!validAddress(address) && (
                    <h2 className="text-red-500">
                      Please enter an invalid contract address.
                    </h2>
                  )}
                  <button
                    disabled={!validAddress(address)}
                    onClick={() => mintNFTs()}
                    className="btn-primary w-fit self-center"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <div>
                  <button onClick={() => mintNFTs()} className="btn-primary bg-green-500 hover:bg-green-600">
                    Mint 🏆
                  </button>
                </div>
              )
            ) : (
              <button className="btn-primary" onClick={connect}>
                Connect your wallet to mint!
              </button>
            )}
          </div>
        )
      }
    }
  }

  return <div>{render()}</div>
}
