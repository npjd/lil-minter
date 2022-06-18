import React, { useEffect, useState } from 'react'
import { ImageListType } from 'react-images-uploading'
import { NFTStorage } from 'nft.storage'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import NFT from '../../types/NFT'
import { dataURItoBlob } from '../../util/dataUriToBlob'

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
  const [progress, setProgress] = useState(
    Math.round((nfts.length / metadata.count) * 100)
  )
  const [state, setState] = useState<'pinning' | 'pinned'>('pinning')
  const renderMetadataString = (string: string, index: number): string => {
    let newString = string.replace('`index`', index.toString())
    newString = newString.replace('`count`', metadata.count.toString())
    return newString
  }

  useEffect(() => {
    if (progress === 100) {
      setState('pinned')
    }
  }, [progress])

  const pinIPFS = async () => {
    
    if (process.env.NFT_STORAGE_KEY == undefined) {
      console.log('NFT_STORAGE_KEY is undefined')
      return
    }
    const nftstorage = new NFTStorage({ token: process.env.NFT_STORAGE_KEY })
    const startingIndex = nfts.length
    const endingIndex = images.length

    if (images.length > 1) {
      for (let i = startingIndex; i < endingIndex; i++) {
        const image = images[i]
        if (image['data_url'] == undefined) {
          console.log('image.dataURL is undefined')
          return
        }
        const parsedName = renderMetadataString(metadata.name, i + 1)
        const parsedDescription = renderMetadataString(
          metadata.description,
          i + 1
        )
        console.log("minting...")
        const metadataFile = await nftstorage.store({
          image: dataURItoBlob(image['data_url']),
          name: parsedName,
          description: parsedDescription,
        })
        console.log('NFT #' + (i + 1) + ' stored')
        console.log('Metadata URL: ' + metadataFile.url)
        const uri = metadataFile.url.replace('ipfs://', '')
        setProgress(Math.round(((i + 1) / endingIndex) * 100))
        const newNft: NFT = {
          uri,
          name: parsedName,
          description: parsedDescription,
          address: '',
          image: image,
        }
        setNfts([...nfts, newNft])
        const exisingNfts = localStorage.getItem('nfts')
        localStorage.setItem(
          'nfts',
          exisingNfts == null
            ? JSON.stringify([newNft])
            : JSON.stringify([...JSON.parse(exisingNfts), newNft])
        )
      }
    } else {
      const image = images[0]
      if (image['data_url'] == undefined) {
        console.log('image data is undefined')
        return
      }

      for (let i = startingIndex; i < metadata.count; i++) {
        const parsedName = renderMetadataString(metadata.name, i + 1)
        const parsedDescription = renderMetadataString(
          metadata.description,
          i + 1
        )
        const metadataFile = await nftstorage.store({
          image: dataURItoBlob(image['data_url']),
          name: parsedName,
          description: parsedDescription,
        })
        console.log('NFT #' + (i + 1) + ' stored')
        console.log('Metadata URL: ' + metadataFile.url)
        const uri = metadataFile.url.replace('ipfs://', '')
        setProgress(Math.round(((i + 1) / metadata.count) * 100))
        const newNft: NFT = {
          uri,
          name: parsedName,
          description: parsedDescription,
          address: '',
          image: image,
        }
        setNfts([...nfts, newNft])
        const exisingNfts = localStorage.getItem('nfts')
        localStorage.setItem(
          'nfts',
          exisingNfts == null
            ? JSON.stringify([newNft])
            : JSON.stringify([...JSON.parse(exisingNfts), newNft])
        )
      }
    }

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
