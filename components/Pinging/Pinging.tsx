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
    const endingIndex = metadata.count

    // Temporary workaround
    await nftstorage.storeBlob(new Blob(['WAKE UP']))

    let id = startingIndex

    while (id < endingIndex) {
      const requests = []
      // 5 is batch size
      for (let i = 0; i < 5; i++) {
        if (id >= endingIndex) break
        let image
        if (images.length == 1) {
          image = images[0]
        } else {
          image = images[id]
        }
        const parsedName = renderMetadataString(metadata.name, id + 1)
        const parsedDescription = renderMetadataString(
          metadata.description,
          id + 1
        )
        requests.push(
          (async () => {
            const metadataFile = await nftstorage.store({
              name: parsedName,
              description: parsedDescription,
              image: dataURItoBlob(image['data_url']),
            })

            console.log('NFT #' + id + ' stored')
            console.log('Metadata URL: ' + metadataFile.url)
            const uri = metadataFile.url.replace('ipfs://', '')
            setProgress(Math.round((id + 1 / metadata.count) * 100))
            const newNft: NFT = {
              uri,
              name: parsedName,
              description: parsedDescription,
              address: '',
              image: image,
            }
            return newNft
          })()
        )
        id++
      }
      const repsonses = await Promise.all(requests)

      for (let i = 0; i < requests.length; i++) {
        const newNft = repsonses[i]
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

    // if (images.length > 1) {
    //   for (let i = startingIndex; i < endingIndex; i++) {
    //     const id = i + 1
    //     requests.push(
    //       (async () => {
    //         const image = images[i]
    //         if (image['data_url'] == undefined) {
    //           console.log('image.dataURL is undefined')
    //           return
    //         }
    //         const parsedName = renderMetadataString(metadata.name, id)
    //         const parsedDescription = renderMetadataString(
    //           metadata.description,
    //           id
    //         )
    //         console.log(id, parsedName)
    //         const metadataFile = await nftstorage.store({
    //           image: dataURItoBlob(image['data_url']),
    //           name: parsedName,
    //           description: parsedDescription,
    //         })
    //         console.log('NFT #' + id + ' stored')
    //         console.log('Metadata URL: ' + metadataFile.url)
    //         const uri = metadataFile.url.replace('ipfs://', '')
    //         setProgress(Math.round((id / metadata.count) * 100))
    //         const newNft: NFT = {
    //           uri,
    //           name: parsedName,
    //           description: parsedDescription,
    //           address: '',
    //           image: image,
    //         }
    //         setNfts([...nfts, newNft])
    //         const exisingNfts = localStorage.getItem('nfts')

    //         localStorage.setItem(
    //           'nfts',
    //           exisingNfts == null
    //             ? JSON.stringify([newNft])
    //             : JSON.stringify([...JSON.parse(exisingNfts), newNft])
    //         )
    //       })()
    //     )
    //     const responses = await Promise.all(requests)
    //   }
    // } else {
    //   const image = images[0]
    //   if (image['data_url'] == undefined) {
    //     console.log('image data is undefined')
    //     return
    //   }

    //   for (let i = startingIndex; i < endingIndex; i++) {
    //     const id = i + 1
    //     requests.push(
    //       (async () => {
    //         const parsedName = renderMetadataString(metadata.name, id)
    //         const parsedDescription = renderMetadataString(
    //           metadata.description,
    //           id
    //         )
    //         console.log(id, parsedName)
    //         const metadataFile = await nftstorage.store({
    //           image: dataURItoBlob(image['data_url']),
    //           name: parsedName,
    //           description: parsedDescription,
    //         })
    //         console.log('NFT #' + id + ' stored')
    //         console.log('Metadata URL: ' + metadataFile.url)
    //         const uri = metadataFile.url.replace('ipfs://', '')
    //         setProgress(Math.round((id / metadata.count) * 100))
    //         const newNft: NFT = {
    //           uri,
    //           name: parsedName,
    //           description: parsedDescription,
    //           address: '',
    //           image: image,
    //         }
    //         setNfts([...nfts, newNft])
    //         const exisingNfts = localStorage.getItem('nfts')

    //         localStorage.setItem(
    //           'nfts',
    //           exisingNfts == null
    //             ? JSON.stringify([newNft])
    //             : JSON.stringify([...JSON.parse(exisingNfts), newNft])
    //         )
    //       })()
    //     )
    //   }

    //   const responses = await Promise.all(requests)
    // }

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
