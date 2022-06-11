import React, { useState } from 'react'
import { ImageListType } from 'react-images-uploading'
import NFT from '../../types/NFT'
import Mint from '../Mint/Mint'
import Pinging from '../Pinging/Pinging'
import AssignAddresses from './AssignAddresses'
import ConfigureDeployment from './ConfigureDeployment'
import DeployContract from './DeployContract'

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
  const renderForm = () => {
    switch (state) {
      case 'deploy':
        return (
          <DeployContract
            setContractAddress={setContractAddress}
            setState={setState}
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

  return <div>{renderForm()}</div>
}
