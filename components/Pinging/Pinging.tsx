import React, { useEffect, useState } from 'react'
import { ImageListType } from 'react-images-uploading'
import { NFTStorage, File } from 'nft.storage'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

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

  const pinIPFS = () => {
    if (process.env.NFT_STORAGE_KEY == undefined) {
      console.log('NFT_STORAGE_KEY is undefined')
      return
    }
    const nftstorage = new NFTStorage({ token: process.env.NFT_STORAGE_KEY })
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
      setProgress(((index + 1) * 100) / images.length)
    })
  }

  useEffect(() => {
    pinIPFS()
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div style={{width:200,height:200}}>
        <CircularProgressbar value={progress} text={`${progress}%`} />
      </div>
      {state == 'pinned' && (
        <div>
          <p>
            <b>Pinning complete!</b>
          </p>
        </div>
      )}
    </div>
  )
}
