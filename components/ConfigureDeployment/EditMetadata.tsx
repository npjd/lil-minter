import React, { useState } from 'react'
import { ImageListType } from 'react-images-uploading'

export default function EditMetadata({
  images,
  metadata,
  setMetadata,
}: {
  images: ImageListType
  metadata: { name: string; description: string; count: number }
  setMetadata: (metadata: {
    name: string
    description: string
    count: number
  }) => void
}) {
  const [name, setName] = useState(metadata.name)
  const [description, setDescription] = useState(metadata.description)
  const [count, setCount] = useState(images.length)

  return (
    <div className="flex flex-col space-y-2 text-left my-5">
      <p> Use `count` and `index` </p>
      <label className="text-sm">Name</label>
      <input
        className="w-full text-input"
        type="text"
        value={name}
        onChange={(e) => {
          setMetadata({ name:e.target.value, description, count })
          localStorage.setItem('metadata', JSON.stringify({ name:e.target.value, description:description, count:count }))
          setName(e.target.value)
        }}
        placeholder="Name"
      />
      <label className="text-sm">Description</label>
      <input
        className="w-full text-input"
        type="text"
        value={description}
        onChange={(e) => {
          setMetadata({ name, description:e.target.value, count })
          localStorage.setItem('metadata', JSON.stringify({ name:e.target.value, description:description, count:count }))
          setDescription(e.target.value)
        }}
        placeholder="Description"
      />
      <label className="text-sm">Count</label>
      <input
        className="w-full text-input disabled:cursor-not-allowed"
        type="number"
        value={count}
        onChange={(e) => {
          setMetadata({ name, description, count: parseInt(e.target.value) })
          localStorage.setItem('metadata', JSON.stringify({ name:e.target.value, description:description, count:count }))
          setCount(parseInt(e.target.value))
        }}
        disabled={images.length !== 1}
      />
    </div>
  )
}
