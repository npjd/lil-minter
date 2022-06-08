import React from 'react'
import NFT from '../../types/NFT'
import ImageCard from '../ConfigureDeployment/ImageCard'
import Papa from 'papaparse'
import { validAddress } from '../../util/validAddress'

export default function AssignAddresses({
  nfts,
  setNfts,
  metadata,
  setWebPageState,
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
}) {
  const csvUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files == null) {
      return
    }
    Papa.parse(event.target.files[0], {
      header: false,
      skipEmptyLines: true,
      complete: function (results) {
        const newNfts: NFT[] = []
        // @ts-ignore
        const addresses = results.data.map((row) => row[0])

        addresses.forEach((address, index) => {
          newNfts.push({
            uri: nfts[index].uri,
            image: nfts[index].image,
            name: nfts[index].name,
            address: address,
            description: nfts[index].description,
          })
        })

        setNfts(newNfts)
      },
    })
  }

  return (
    // create a grid
    <div className="flex flex-col">
      <h2>Assign Addresses</h2>
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={csvUploadHandler}
        className="btn-primary"
      />
      <div className="flex flex-row overflow-x-auto space-x-4">
        {nfts.map((nft, index) => {
          return (
            <div key={index}>
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
      {nfts.every((nft) => validAddress(nft.address)) && (
        <button
          className="btn-primary bg-green-500 hover:bg-green-600"
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
