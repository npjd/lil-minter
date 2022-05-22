import React, { useState } from 'react'
import { ImageListType } from 'react-images-uploading'
import EditMetadata from '../ConfigureDeployment/EditMetadata'
import UploadImages from '../ConfigureDeployment/UploadImages'
import ViewImages from '../ConfigureDeployment/ViewImages'

export default function ConfigureDeployment() {
  const [images, setImages] = useState<ImageListType>([])
  return (
    
    <div>
      <UploadImages setImages={setImages} images={images} />
      {images.length >= 1 && (
        <div className='flex flex-row w-full justify-evenly'>
          <EditMetadata />
          <ViewImages images={images} />
        </div>
      )}
    </div>
  )
}
