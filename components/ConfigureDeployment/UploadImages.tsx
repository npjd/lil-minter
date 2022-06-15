import React from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import Upload from '../icons/Upload'

export default function UploadImages({
  images,
  setImages,
}: {
  images: ImageListType
  setImages: (images: ImageListType) => void
}) {
  const onChange = (imageList: ImageListType) => {
    setImages(imageList)
    localStorage.setItem('images', JSON.stringify(imageList))
  }

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={50}
        dataURLKey="data_url"
        acceptType={['png', 'jpg', 'jpeg']}
      >
        {({ onImageUpload, onImageRemoveAll, isDragging, dragProps }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {images.length == 0 && (
              <div
                className={
                  'w-full h-60 bg-gray-100 cursor-pointer rounded grid place-items-center -space-y-11 hover:bg-slate-200 border-2 border-dashed border-gray-400 ' +
                  (isDragging ? ' bg-green-300' : '')
                }
                onClick={onImageUpload}
                {...dragProps}
              >
                <Upload/>
                <p className="text-xl">{isDragging ? 'Drop Images' : 'Upload or Drop Image(s)'}</p>
              </div>
            )}
            &nbsp;
            {images.length > 0 && (
              <button
                onClick={onImageRemoveAll}
                className="btn-primary bg-red-500 hover:bg-red-700"
              >
                Remove all images
              </button>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  )
}
