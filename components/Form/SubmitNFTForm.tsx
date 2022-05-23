import React, { useState } from 'react'
import { ImageListType } from 'react-images-uploading'
import ConfigureDeployment from './ConfigureDeployment'
import ConnectWallet from './ConnectWallet'
import DeployContract from './DeployContract'
import ProgressBar from './ProgressBar'

export default function SubmitNFTForm() {
  const [state, setState] = useState<
    'connect' | 'deploy' | 'configure' | 'confirm'
  >('connect')
  const [metadata, setMetadata] = useState<{
    name: string
    description: string
    count: number
  }>({ name: '', description: '', count: 0 })
  const [images, setImages] = useState<ImageListType>([])
  const renderForm = () => {
    switch (state) {
      case 'connect':
        return <ConnectWallet setState={setState} />
      case 'deploy':
        return <DeployContract />
      case 'configure':
        return (
          <ConfigureDeployment metadata={metadata} setMetadata={setMetadata} images={images} setImages={setImages} />
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
  const stateToProgress = (): number => {
    switch (state) {
      case 'connect':
        return 25
      case 'deploy':
        return 50
      case 'configure':
        return 75
      case 'confirm':
        return 100
    }
  }
  return (
    <div>
      <ProgressBar progress={stateToProgress()} />
      {renderForm()}
    </div>
  )
}
