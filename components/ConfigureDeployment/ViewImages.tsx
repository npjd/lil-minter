import React from 'react'
import { ImageListType } from 'react-images-uploading'
import ImageCard from './ImageCard'

export default function ViewImages({
  images,
  metadata,
}: {
  images: ImageListType
  metadata: {
    name: string
    description: string
    count: number
  }
}) {
  return (
    <>
      {images.length == 1 ? (
        <div className="flex relative">
          <div className=" absolute">
            <ImageCard image={images[0]} index={1} metadata={metadata} />
          </div>
          <div className=" absolute top-2 -left-2">
            <ImageCard image={images[0]} index={1} metadata={metadata}  />
          </div>
          <div className=" absolute top-4 -left-4">
            <ImageCard image={images[0]} index={1} metadata={metadata}  />
          </div>
          <div className=" absolute top-6 -left-6">
            <ImageCard image={images[0]} index={1} metadata={metadata} />
          </div>
        </div>
      ) : (
        <div className="flex flex-row overflow-x-auto w-1/2 space-x-4">
          {/* TODO: this isn't working ffs */}
          {images.map((image, index) => (
            <ImageCard
              key={index}
              image={image}
              index={index + 1}
              metadata={metadata}
            />
          ))}
        </div>
      )}
    </>
  )
}
