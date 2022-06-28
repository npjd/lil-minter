import { getMany } from 'idb-keyval'
import React, { useEffect, useState } from 'react'
import { ImageListType } from 'react-images-uploading'
import NFT from '../../types/NFT'
import Mint from '../Mint/Mint'
import Pinging from '../Pinging/Pinging'
import AssignAddresses from './AssignAddresses'
import ConfigureDeployment from './ConfigureDeployment'
import DeployContract from './DeployContract'
import ResetNFT from './ResetNFT'

export default function SubmitNFTForm() {
  const [state, setState] = useState<
    'deploy' | 'configure' | 'ping' | 'assign' | 'mint'
  >('deploy')
  const [contractAddress, setContractAddress] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<{
    name: string
    description: string
    count: number
  }>({ name: '', description: '', count: 1 })
  const [nfts, setNfts] = useState<NFT[]>([])
  const [images, setImages] = useState<ImageListType>([])

  // useEffect(() => {
  //   const getCachedVals = () => {
  //     getMany(['contractAddress', 'metadata', 'nfts', 'images']).then(
  //       ([storedAddress, storedMetadata, storedNfts, storedImages]) => {
  //         if (storedAddress != null) {
  //           setContractAddress(storedAddress)
  //         }
  //         if (storedMetadata != null) {
  //           console.log(storedMetadata)
  //           setMetadata(storedMetadata)
  //         }

  //         if (storedNfts != null) {
  //           setNfts(storedNfts)
  //         }
  //         if (storedImages != null) {
  //           console.log(storedImages)
  //           setImages(storedImages)
  //         }

  //         if (storedAddress != null) {
  //           setState('configure')
  //         }
  //         if (storedNfts != null && storedMetadata != null) {
  //           if (
  //             storedNfts.length >= storedMetadata.count &&
  //             storedNfts.length > 0
  //           ) {
  //             setState('assign')
  //           } else if (
  //             storedNfts.length < storedMetadata.count &&
  //             storedNfts.length > 0
  //           ) {
  //             setState('ping')
  //           }
  //         }
  //       }
  //     )
  //   }
  //   getCachedVals()
  // }, [])

  const renderForm = () => {
    switch (state) {
      case 'deploy':
        return (
          <DeployContract
            setContractAddress={setContractAddress}
            setState={setState}
            contractAddress={contractAddress}
          />
        )
      case 'configure':
        return (
          <ConfigureDeployment
            metadata={metadata}
            setMetadata={setMetadata}
            images={images}
            setImages={setImages}
            setState={setState}
          />
        )
      case 'ping':
        return (
          <Pinging
            images={images}
            metadata={metadata}
            setNfts={setNfts}
            nfts={nfts}
            setWebPageState={setState}
          />
        )
      case 'assign':
        return (
          <AssignAddresses
            nfts={nfts}
            setNfts={setNfts}
            metadata={metadata}
            setWebPageState={setState}
            setMetadata={setMetadata}
          />
        )
      case 'mint':
        return contractAddress ? (
          <Mint nfts={nfts} address={contractAddress} />
        ) : (
          <p>Contract not found</p>
        )
    }
  }

  return (
    <div>
      {renderForm()}
      {state != 'deploy' && (
        <ResetNFT
          setState={setState}
          setContractAddress={setContractAddress}
          setImages={setImages}
          setMetadata={setMetadata}
          setNfts={setNfts}
        />
      )}
    </div>
  )
}
