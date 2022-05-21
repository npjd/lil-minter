import React from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'

export default function UploadImages({
  images,
  setImages,
}: {
  images: ImageListType
  setImages: (images: ImageListType) => void
}) {
  const onChange = (imageList: ImageListType) => {
    setImages(imageList)
    console.log(imageList)
  }

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={50}
        dataURLKey="data_url"
        acceptType={['jpg', 'gif', 'png']}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              className={'btn-primary' + (isDragging ? ' bg-green-500' : '')}
              onClick={onImageUpload}
              {...dragProps}
            >
              {isDragging ? 'Drop Images' : 'Upload or Drop Image(s)'}
            </button>
            &nbsp;
            <button
              onClick={onImageRemoveAll}
              className="btn-primary bg-red-500 hover:bg-red-700"
            >
              Remove all images
            </button>
          </div>
        )}
      </ImageUploading>
    </div>
  )
}
