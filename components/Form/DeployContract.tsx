import React, { useState } from 'react'

export default function DeployContract() {
  const [name, setName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [status, setStatus] = useState<'deploying' | 'none' | 'error' | 'good'>(
    'none'
  )
  return (
    <div>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Token Symbol</label>
      <input
        type="text"
        value={tokenSymbol}
        onChange={(e) => setTokenSymbol(e.target.value)}
      />
      <button className="btn-primary">Deploy</button>
    </div>
  )
}
