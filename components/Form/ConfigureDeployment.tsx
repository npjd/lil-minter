import React, { useState } from 'react'
import { ImageListType } from 'react-images-uploading'
import UploadImages from '../ConfigureDeployment/UploadImages'

export default function ConfigureDeployment() {
  const [images, setImages] = useState<ImageListType>([])
  return (
    <div>
      <UploadImages setImages={setImages} images={images} />
    </div>
  )
}
