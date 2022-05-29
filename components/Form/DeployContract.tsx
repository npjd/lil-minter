import React, { useState } from 'react'

export default function DeployContract({
  setContractAddress,
}:{
  setContractAddress: (contractAddress: string) => void
}) {
  const [name, setName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [status, setStatus] = useState<'deploying' | 'none' | 'error' | 'good'>(
    'none'
  )

  const deployContract= () =>{

  }
  
  return (
    <div className="flex flex-col space-y-2">
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-input"
      />
      <label>Token Symbol</label>
      <input
        type="text"
        value={tokenSymbol}
        onChange={(e) => setTokenSymbol(e.target.value)}
        className="text-input"
      />
      <button className="btn-primary">Deploy</button>
    </div>
  )
}
