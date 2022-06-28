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
import { sliceIntoChunks } from '../../util/sliceIntoChunks'
import { get, set } from 'idb-keyval'

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
    const startingIndex = await get('mintingIndex') || 0
    const { ethereum } = window as any
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const toAddresses = sliceIntoChunks(nfts.map((nft) => nft.address),100)
    const uris = sliceIntoChunks(nfts.map((nft) => nft.uri),100)
    const contract = new ethers.Contract(address, abi, signer)
    try {

      for (let ii = startingIndex; ii < uris.length; ii++) {
        const currentRecipientBatch = toAddresses[ii]
        const currentUriBatch = uris[ii]
        const val = await contract.batchMint(currentRecipientBatch, currentUriBatch)
        console.log(val)
        alert.success(`Minted batch ${ii+1} of ${uris.length}`)
        await set('mintingIndex', ii + 1)
      }

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
