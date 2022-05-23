import React, { useState } from 'react'
import { ImageListType } from 'react-images-uploading'

export default function EditMetadata({
  images,
  metadata,
  setMetadata,
}: {
  images: ImageListType
  metadata: { name: string; description: string }
  setMetadata: (metadata: { name: string; description: string }) => void
}) {
  const [name, setName] = useState(metadata.name)
  const [description, setDescription] = useState(metadata.description)
  const [count, setCount] = useState(images.length)
  const updateMetadata = () => {
    setMetadata({ name, description })
    
  }
  return (
    <div className="flex flex-col">
      <label className="text-sm">Name</label>
      <input
        className="w-full"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
          updateMetadata()
        }}
        placeholder="Name"
      />
      <label className="text-sm">Description</label>
      <input
        className="w-full"
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value)
          updateMetadata()
        }}
        placeholder="Description"
      />
      <label className="text-sm">Count</label>
      <input
        className="w-full"
        type="number"
        value={count}
        onChange={(e) => {
          setCount(parseInt(e.target.value))
          updateMetadata()
        }}
      />
    </div>
  )
}
