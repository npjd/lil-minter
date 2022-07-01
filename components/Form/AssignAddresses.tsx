import React from 'react'
import NFT from '../../types/NFT'
import ImageCard from '../ConfigureDeployment/ImageCard'
import Papa from 'papaparse'
import { validAddress } from '../../util/validAddress'
import { useAlert } from 'react-alert'
import { set } from 'idb-keyval'

export default function AssignAddresses({
  nfts,
  setNfts,
  metadata,
  setWebPageState,
  setMetadata,
}: {
  nfts: NFT[]
  setNfts: (nfts: NFT[]) => void
  metadata: {
    name: string
    description: string
    count: number
  }
  setWebPageState: (
    state: 'deploy' | 'configure' | 'ping' | 'assign' | 'mint'
  ) => void
  setMetadata: (metadata: {
    name: string
    description: string
    count: number
  }) => void
}) {
  // TODO: CREATE RESTORE BUTTON
  const alert = useAlert()
  const csvUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files == null) {
      return
    }
    Papa.parse(event.target.files[0], {
      header: false,
      skipEmptyLines: true,
      complete: function (results) {
        const newNfts: NFT[] = []
        alert.info('File uploaded')
        // @ts-ignore
        const addresses = results.data.map((row) => row[0])
        console.log(addresses.length)
        for (let i = 0; i < addresses.length; i++) {
          if (i >= nfts.length) {
            break
          }

          newNfts.push({
            address: addresses[i],
            image: nfts[i].image,
            name: nfts[i].name,
            uri: nfts[i].uri,
            description: nfts[i].description,
          })
        }
        if (addresses.length < metadata.count) {
          setNfts(newNfts.concat(nfts.slice(addresses.length)))
          set('nfts', newNfts.concat(nfts.slice(addresses.length)))
        } else {
          setNfts(newNfts)
          set('nfts', newNfts)
        }
      },
    })
  }

  return (
    // create a grid
    <div className="flex flex-col">
      <h2 className="text-xl my-2">Assign Addresses</h2>
      <div className="flex flex-col items-start space-y-2">
        <label>Upload a file of addresses</label>
        <input
          type="file"
          name="file"
          accept=".csv"
          onChange={csvUploadHandler}
          className="btn-primary"
        />
      </div>
      <div className="flex flex-row overflow-x-auto space-x-4 px-2">
        {nfts.map((nft, index) => {
          return (
            <div key={index} className="flex flex-col my-4">
              <ImageCard
                image={nft.image}
                name={nft.name}
                description={nft.description}
              />
              <input
              tabIndex={index + 1}
                className="text-input rounded-none"
                type="text"
                placeholder="Enter recipient address"
                value={nft.address}
                onChange={(e) => {
                  const newNfts = [...nfts]
                  newNfts[index].address = e.target.value
                  setNfts(newNfts)
                }}
              />
              {!(index == 0 && nfts.length == 1) && (
                <button
                  className="bg-red-500 hover:bg-red-600 p-2 rounded text-white"
                  onClick={() => {
                    let newNfts = [...nfts]
                    newNfts.splice(index, 1)
                    setMetadata({
                      name: metadata.name,
                      description: metadata.description,
                      count: metadata.count - 1,
                    })
                    setNfts(newNfts)
                    set('nfts', newNfts)
                  }}
                >
                  Delete NFT
                </button>
              )}
            </div>
          )
        })}
      </div>
      {nfts.every((nft) => validAddress(nft.address)) && (
        <button
          className="btn-primary bg-green-500 hover:bg-green-600 w-fit self-center"
          onClick={(e) => {
            e.preventDefault()
            setWebPageState('mint')
          }}
        >
          Mint!
        </button>
      )}
    </div>
  )
}
