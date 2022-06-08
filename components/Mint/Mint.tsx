import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import NFT from '../../types/NFT'
import { abi } from '../../artifacts/contracts/MinterNFT.sol/MinterNFT.json'

export default function Mint({
  nfts,
  address,
}: {
  nfts: NFT[]
  address: string
}) {
  const [minting, setMinting] = useState<boolean>(false)
  const [status, setStatus] = useState<'success' | 'error'>('success')
  const mintNFTs = async () => {
    setMinting(true)
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
      setStatus('success')
    } catch (e) {
      console.log(e)
      setMinting(false)
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
            {status == 'error' ? (
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
            )}
          </div>
        )
      }
    }
  }
  useEffect(() => {
    mintNFTs()
  }, [])

  return <div>{render()}</div>
}
