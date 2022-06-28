import { set } from 'idb-keyval'
import { NFTStorage } from 'nft.storage'
import { useEffect, useState } from 'react'
import { ImageListType } from 'react-images-uploading'

import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import NFT from '../../types/NFT'
import { dataURItoBlob } from '../../util/dataUriToBlob'
import { renderMetadataString } from '../../util/renderMetadataString'

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
  const [state, setState] = useState<'start' | 'pinging' | 'complete'>('start')
  const [progress, setProgress] = useState(
    Math.round((nfts.length / metadata.count) * 100)
  )

  useEffect(() => {
    if (nfts.length == metadata.count) {
      setState('complete')
    }
  }, [])

  const pinIpfs = async () => {
    if (process.env.NFT_STORAGE_KEY == undefined) {
      console.error('NFT_STORAGE_KEY is not set')
      return
    }
    const nftstorage = new NFTStorage({ token: process.env.NFT_STORAGE_KEY })
    setState('pinging')
    let index = nfts.length
    const endingIndex = metadata.count
    const finalNfts = nfts

    console.log('Starting at index: ' + index)
    console.log('Ending at index: ' + endingIndex)

    while (index < endingIndex) {
      const batchRequests = []
      // make name array of index-> index+5
      const names = []
      const descriptions = []
      const imagesToPin = []
      for (let ii = 0; ii < 5; ii++) {
        if (index >= endingIndex) break
        let image
        if (images.length == 1) {
          image = images[0]
        } else {
          image = images[index]
        }
        imagesToPin.push(image)
        names.push(renderMetadataString(metadata.name, index + 1, metadata))
        descriptions.push(
          renderMetadataString(metadata.description, index + 1, metadata)
        )
        index++
      }

      for (let iii = 0; iii < names.length; iii++) {
        let name = names[iii]
        let description = descriptions[iii]
        let image = imagesToPin[iii]
        batchRequests.push(
          (async () => {
            const metadataFile = await nftstorage.store({
              name: name,
              description: description,
              image: dataURItoBlob(image['data_url']),
            })
            console.log('Name and description stored', name, description)
            const uri = metadataFile.url.replace('ipfs://', '')

            const newNft: NFT = {
              uri,
              name: name,
              description: description,
              address: '',
              image: image,
            }
            return newNft
          })()
        )
      }

      console.log('Batch requests: ' + batchRequests.length)
      const newNfts = await Promise.all(batchRequests)
      console.log('Batch requests resolved')
      finalNfts.push(...newNfts)
      setNfts(finalNfts)
      setProgress(Math.round((nfts.length / metadata.count) * 100))
      await set('nfts', finalNfts)
    }

    setState('complete')
    console.log('Finished pinning')
    console.log('Final NFTs: ' + finalNfts)
  }

  return (
    <div className="flex flex-col items-center">
      {state == 'start' && (
        <>
          {nfts.length > 1 && <p>Picking up from index {nfts.length}</p>}
          <button className="btn-primary" onClick={pinIpfs}>
            Ping Nfts!
          </button>
          <p>
            NFT data is uploaded onto IPFS, a decentralized file storing system.
            It is used to keep your images and metadata safe!
          </p>
        </>
      )}
      {(state == 'pinging' || state == 'complete') && (
        <div style={{ width: 200, height: 200 }}>
          <CircularProgressbar value={progress} text={`${progress}%`} />
        </div>
      )}

      {state == 'complete' && (
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
