import React, { useState } from 'react'
import { ImageListType } from 'react-images-uploading'
import EditMetadata from '../ConfigureDeployment/EditMetadata'
import UploadImages from '../ConfigureDeployment/UploadImages'
import ViewImages from '../ConfigureDeployment/ViewImages'

export default function ConfigureDeployment({
  metadata,
  setMetadata,
  images,
  setImages,
  setState,
}: {
  metadata: { name: string; description: string; count: number }
  setMetadata: (metadata: {
    name: string
    description: string
    count: number
  }) => void
  images: ImageListType
  setImages: (images: ImageListType) => void
  setState: (state: 'ping') => void
}) {
  return (
    <div>
      <UploadImages setImages={setImages} images={images} />
      {images.length >= 1 && (
        <div className="flex flex-row justify-evenly">
          <EditMetadata
            images={images}
            metadata={metadata}
            setMetadata={setMetadata}
          />
          <ViewImages images={images} metadata={metadata} />
        </div>
      )}
      <button className="btn-primary" onClick={() => setState('ping')}>
        Next
      </button>
    </div>
  )
}
