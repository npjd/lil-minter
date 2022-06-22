import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { abi } from '../../artifacts/contracts/MinterNFT.sol/MinterNFT.json'
import NFT from '../../types/NFT'

export default function Mint({
  nfts,
  address,
}: {
  nfts: NFT[]
  address: string
}) {
  const [minting, setMinting] = useState<boolean>(false)
  const alert = useAlert()
  const [status, setStatus] = useState<'success' | 'error'>('success')
  const mintNFTs = async () => {
    setMinting(true)
    alert.info('Minting NFTs...')
    const { ethereum } = window as any
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const toAddresses = nfts.map((nft) => nft.address)
    const uris = nfts.map((nft) => nft.uri)
    const contract = new ethers.Contract(address, abi, signer)
    // create batches of 100 to mint
    for (let i = 0; i < uris.length; i++) {
      const uriChunk = uris.slice(i, i + 100)
      const toAddressesChunk = toAddresses.slice(i, i + 100)
      try {
        const val = await contract.batchMint(toAddresses, uris)
        console.log(val)
        alert.success(`Batch ${i + 1}/${uris.length} Minted!`)
      } catch (e) {
        alert.error(`Batch ${i + 1}/${uris.length} Failed...`)
        alert.error('Are you possibly using the wrong contract address?')
        break
      }
    }
    setMinting(false)

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
            {status == 'error' ? (
              <>
                <h1>Minting Failed</h1>
                <button onClick={() => mintNFTs()} className="btn-primary">
                  Retry
                </button>
              </>
            ) : (
              <>
                <button onClick={() => mintNFTs()} className="btn-primary">
                  Mint
                </button>
                {nfts.length > 100 && (
                  <p>
                    You may be prompted to confirm multiple transactions because
                    of the high volume of NFTs you are minting...
                  </p>
                )}
              </>
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
