import React from 'react'
import NFT from '../../types/NFT'
import ImageCard from '../ConfigureDeployment/ImageCard'
import Papa from 'papaparse'

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
  const validAddress = (address: string) => {
    return /^(0x){1}[0-9a-fA-F]{40}$/i.test(address)
  }

  const csvUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files == null) {
      return
    }
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        // go through each row and set the address in each row's index to the nft object respectivly
        const newNfts:NFT[]= []
        results.data.forEach((row, index) => {
          if (index >= nfts.length) {
            return
          }
          // console.log("row",Object.values(row))
          const nft = nfts[index]
          // nft.address = Object.values(row)[0] as string
          newNfts.push(nft)
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
      {nfts.every((nft) => validAddress(nft.address)) && (
        <button className="btn-primary bg-green-500 hover:bg-green-600">
          Mint!
        </button>
      )}
    </div>
  )
}
