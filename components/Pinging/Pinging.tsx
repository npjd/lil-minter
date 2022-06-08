import React, { useEffect, useState } from 'react'
import { ImageListType } from 'react-images-uploading'
import { NFTStorage } from 'nft.storage'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import NFT from '../../types/NFT'

export default function Pinging({
  images,
  metadata,
  setNfts,
  nfts,
  setWebPageState,
}: {
  images: ImageListType
  metadata: {
    name: string
    description: string
    count: number
  }
  setNfts: (nfts: NFT[]) => void
  nfts: NFT[]
  setWebPageState: (
    state: 'deploy' | 'configure' | 'ping' | 'assign' | 'mint'
  ) => void
}) {
  const [progress, setProgress] = useState(0)
  const [state, setState] = useState<'pinning' | 'pinned'>('pinning')
  const renderMetadataString = (string: string, index: number): string => {
    let newString = string.replace('`index`', index.toString())
    newString = newString.replace('`count`', metadata.count.toString())
    return newString
  }

  useEffect(() => {
    if (progress == 100) {
      setState('pinned')
    }
  }, [progress])

  const pinIPFS = async () => {
    if (process.env.NFT_STORAGE_KEY == undefined) {
      console.log('NFT_STORAGE_KEY is undefined')
      return
    }
    const nftstorage = new NFTStorage({ token: process.env.NFT_STORAGE_KEY })
    const newArray: NFT[] = []
    if (images.length > 1) {
      images.forEach(async (image, index) => {
        if (image.file == undefined) {
          console.log('image.file is undefined')
          return
        }
        const parsedName = renderMetadataString(metadata.name, index + 1)
        const parsedDescription = renderMetadataString(
          metadata.description,
          index + 1
        )
        const metadataFile = await nftstorage.store({
          image: image.file,
          name: parsedName,
          description: parsedDescription,
        })
        console.log('NFT #' + (index + 1) + ' stored')
        console.log('Metadata URL: ' + metadataFile.url)
        const uri = metadataFile.url.replace('ipfs://', '')
        setProgress(((index + 1) * 100) / images.length)
        newArray.push({
          name: parsedName,
          description: parsedDescription,
          image: image,
          uri: uri,
          address: '',
        })
      })
    } else {
      const image = images[0]
      if (image.file == undefined) {
        console.log('image is undefined')
        return
      }

      for (let i = 0; i < metadata.count; i++) {
        const parsedName = renderMetadataString(metadata.name, i + 1)
        const parsedDescription = renderMetadataString(
          metadata.description,
          i + 1
        )
        const metadataFile = await nftstorage.store({
          image: image.file,
          name: parsedName,
          description: parsedDescription,
        })
        console.log('NFT #' + (i + 1) + ' stored')
        console.log('Metadata URL: ' + metadataFile.url)
        const uri = metadataFile.url.replace('ipfs://', '')

        setProgress(((i + 1) * 100) / metadata.count)
        newArray.push({
          name: parsedName,
          description: parsedDescription,
          image: image,
          uri: uri,
          address: '',
        })
      }
    }
    console.log("new array",newArray)
    setNfts(newArray)
    console.log('NFTs stored', nfts)
  }

  useEffect(() => {
    pinIPFS().then(() => {
      console.log(nfts)
    })
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar value={progress} text={`${progress}%`} />
      </div>
      {state == 'pinned' && (
        <div>
          <p>
            <b>Pinning complete!</b>
          </p>
          <button
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault()
              setWebPageState('assign')
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
