import React, { useState } from 'react'
import ConfigureDeployment from './ConfigureDeployment'
import ConnectWallet from './ConnectWallet'
import ProgressBar from './ProgressBar'

export default function SubmitNFTForm() {
  const [state, setState] = useState<'connect' | 'configure' | 'confirm'>(
    'connect'
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
  return (
    <div>
      <ProgressBar progress={20} />
      {renderForm()}
    </div>
  )
}
