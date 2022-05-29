import React, { useEffect, useState } from 'react'
import { ImageListType } from 'react-images-uploading'
import { NFTStorage, File } from 'nft.storage'

export default function Pinging({
  images,
  metadata,
}: {
  images: ImageListType
  metadata: {
    name: string
    description: string
    count: number
  }
}) {
  const [state, setState] = useState<'pinging' | 'pinged'>('pinging')
  const renderMetadataString = (string: string, index: number): string => {
    let newString = string.replace('`index`', index.toString())
    newString = newString.replace('`count`', metadata.count.toString())
    return newString
  }

  const pinIPFS = () => {
    if (process.env.NFT_STORAGE_KEY == undefined) {
      console.log('NFT_STORAGE_KEY is undefined')
      return
    }
    const nftstorage = new NFTStorage({ token: process.env.NFT_STORAGE_KEY })
    images.forEach( async (image, index) => {
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
    })
    
  }

  useEffect(() => {
    pinIPFS()
  }, [])

  return <div>{state === 'pinging' ? <h1>Pinging</h1> : <h1>Pinged!</h1>}</div>
}
