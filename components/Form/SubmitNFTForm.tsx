import React, { useState } from 'react'
import ConfigureDeployment from './ConfigureDeployment'
import ConnectWallet from './ConnectWallet'
import ProgressBar from './ProgressBar'

export default function SubmitNFTForm() {
  const [state, setState] = useState<'connect' | 'configure' | 'confirm'>(
    'configure'
  )
  const renderForm = () => {
    switch (state) {
      case 'connect':
        return <ConnectWallet setState={setState} />
      case 'configure':
        return <ConfigureDeployment />
      case 'confirm':
        return <ConfigureDeployment />
    }
  }
  const stateToProgress = (): number => {
    switch (state) {
      case 'connect':
        return 33
      case 'configure':
        return 66
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
