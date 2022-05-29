import React, { useState } from 'react'
import { ImageListType } from 'react-images-uploading'
import ConfigureDeployment from './ConfigureDeployment'

import DeployContract from './DeployContract'
import ProgressBar from './ProgressBar'

export default function SubmitNFTForm() {
  const [state, setState] = useState<
   'deploy' | 'configure' | 'ping'| 'assign'|'confirm'
  >('configure')
  const [contractAddress, setContractAddress] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<{
    name: string
    description: string
    count: number
  }>({ name: '', description: '', count: 0 })
  const [images, setImages] = useState<ImageListType>([])
  const renderForm = () => {
    switch (state) {
      case 'deploy':
        return <DeployContract setContractAddress={setContractAddress} setState={setState} />
      case 'configure':
        return (
          <ConfigureDeployment metadata={metadata} setMetadata={setMetadata} images={images} setImages={setImages} setState={setState} />
        )
      case 'confirm':
        return (
          // <ConfigureDeployment metadata={metadata} setMetadata={setMetadata} />
          <div>
            lol
          </div>
        )
    }
  }
  // const stateToProgress = (): number => {
  //   switch (state) {
  //     case 'connect':
  //       return 25
  //     case 'deploy':
  //       return 50
  //     case 'configure':
  //       return 75
  //     case 'confirm':
  //       return 100
  //   }
  // }
  return (
    <div>
      {/* <ProgressBar progress={stateToProgress()} /> */}
      {renderForm()}
    </div>
  )
}
