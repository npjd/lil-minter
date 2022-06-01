import React from 'react'
import NFT from '../../types/NFT'
import ImageCard from '../ConfigureDeployment/ImageCard'

export default function AssignAddresses({
  nfts,
  setNfts,
  metadata,
}: {
  nfts: NFT[]
  setNfts: (nfts: NFT[]) => void
  metadata: {
    name: string
    description: string
    count: number
  }
}) {
  return (
    // create a grid
    <div className="grid grid-cols-4 gap-4">
      {nfts.map((nft, index) => {
        return (
          <div>
            <ImageCard image={nft.image} index={index} metadata={metadata} />
            <input
              className="text-input"
              type="text"
              placeholder="Enter recipient address"
              value={nft.address}
              onChange={(e) => {
                const newNfts = [...nfts]
                newNfts[index].address = e.target.value
                setNfts(newNfts)
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
