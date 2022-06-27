import { ethers } from 'ethers'
import React, { useState } from 'react'
import NFT from '../../types/NFT'
import { abi } from '../../artifacts/contracts/MinterNFT.sol/MinterNFT.json'
import { useAlert } from 'react-alert'
import {
  useChainId,
  useStatus,
  connect,
  switchChain,
} from '@cfxjs/use-wallet/dist/ethereum'

export default function Mint({
  nfts,
  address,
}: {
  nfts: NFT[]
  address: string
}) {
  const [minting, setMinting] = useState<boolean>(false)
  const alert = useAlert()
  const [status, setStatus] = useState<'success' | 'error' | ''>('')
  const walletStatus = useStatus()
  const chainId = useChainId()
  // TODO: FIX BATCH MINTING
  const mintNFTs = async () => {
    if (!(chainId == '1030' || chainId == '71')) {
      alert.info('Changing to eSpace chain...')
      await switchChain('0x406')
    }
    setMinting(true)
    alert.info('Minting NFTs...')
    const { ethereum } = window as any
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const toAddresses = nfts.map((nft) => nft.address)
    const uris = nfts.map((nft) => nft.uri)
    const contract = new ethers.Contract(address, abi, signer)
    try {
      const val = await contract.batchMint(toAddresses, uris)
      console.log(val)
      setMinting(false)
      alert.success('Minted!')
      setStatus('success')
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
        return <h1>Minting Successful</h1>
      } else {
        return (
          <div>
            {walletStatus == 'active' ? (
              status == 'error' ? (
                <>
                  <h1>Minting Failed</h1>
                  <button onClick={() => mintNFTs()} className="btn-primary">
                    Retry
                  </button>
                </>
              ) : (
                <button onClick={() => mintNFTs()} className="btn-primary">
                  Mint
                </button>
              )
            ) : (
              <button onClick={connect}>Connect your wallet to mint!</button>
            )}
          </div>
        )
      }
    }
  }

  return <div>{render()}</div>
}
