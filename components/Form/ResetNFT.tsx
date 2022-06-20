import React from 'react'
import { ImageListType } from 'react-images-uploading'
import NFT from '../../types/NFT'

export default function ResetNFT({
  setState,
  setContractAddress,
  setMetadata,
  setNfts,
  setImages,
}: {
  setState: (state: 'deploy') => void
  setContractAddress: (contractAddress: string | null) => void
  setMetadata: (metadata: {
    name: string
    description: string
    count: number
  }) => void
  setNfts: (nfts: NFT[]) => void
  setImages: (images: ImageListType) => void
}) {
  return (
    <button
      className="btn-primary bg-red-500 hover:bg-red-600"
      onClick={() => {
        setState('deploy')
        setContractAddress(null)
        setMetadata({ name: '', description: '', count: 1 })
        setNfts([])
        setImages([])

        localStorage.removeItem('contractAddress')
        localStorage.removeItem('metadata')
        localStorage.removeItem('nfts')
        localStorage.removeItem('images')
      }}
    >
      RESET
    </button>
  )
}
