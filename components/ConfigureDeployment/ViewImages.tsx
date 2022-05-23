import React from 'react'
import { ImageListType } from 'react-images-uploading'
import ImageCard from './ImageCard'

export default function ViewImages({ images }: { images: ImageListType }) {
  return (
    <div >
      {images.length == 1 ? (
        <div className="flex relative">
          <div className=" absolute">
            <ImageCard image={images[0]} />
          </div>
          <div className=" absolute top-2 -left-2">
            <ImageCard image={images[0]} />
          </div>
          <div className=" absolute top-4 -left-4">
            <ImageCard image={images[0]} />
          </div>
          <div className=" absolute top-6 -left-6">
            <ImageCard image={images[0]} />
          </div>
        </div>
      ) : (
        <div className="flex flex-row overflow-x-scroll space-x-2">
          {/* TODO: this isn't working ffs */}
          {images.map((image, index) => (
            <ImageCard key={index} image={image} />
          ))}
        </div>
      )}
    </div>
  )
}
