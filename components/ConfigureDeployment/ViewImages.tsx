import React from 'react'
import { ImageListType } from 'react-images-uploading'
import { renderMetadataString } from '../../util/renderMetadataString'
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
  const renderImages = () => {
    return (
      <>
        {images.length == 1 ? (
          <div className="flex relative ">
            {metadata.count >= 1 && (
              <div>
                <ImageCard
                  image={images[0]}
                  name={renderMetadataString(metadata.name, 1, metadata)}
                  description={renderMetadataString(
                    metadata.description,
                    1,
                    metadata
                  )}
                />
              </div>
            )}
            {metadata.count >= 2 && (
              <div className=" absolute top-2 -left-2">
                <ImageCard
                  image={images[0]}
                  name={renderMetadataString(metadata.name, 1, metadata)}
                  description={renderMetadataString(
                    metadata.description,
                    1,
                    metadata
                  )}
                />
              </div>
            )}
            {metadata.count >= 3 && (
              <div className=" absolute top-4 -left-4">
                <ImageCard
                  image={images[0]}
                  name={renderMetadataString(metadata.name, 1, metadata)}
                  description={renderMetadataString(
                    metadata.description,
                    1,
                    metadata
                  )}
                />
              </div>
            )}
            {metadata.count >= 4 && (
              <div className=" absolute top-6 -left-6">
                <ImageCard
                  image={images[0]}
                  name={renderMetadataString(metadata.name, 1, metadata)}
                  description={renderMetadataString(
                    metadata.description,
                    1,
                    metadata
                  )}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-row overflow-x-auto w-1/2 space-x-4">
            {images.map((image, index) => (
              <ImageCard
                key={index}
                image={image}
                name={renderMetadataString(metadata.name, index + 1, metadata)}
                description={renderMetadataString(
                  metadata.description,
                  index + 1,
                  metadata
                )}
              />
            ))}
          </div>
        )}
      </>
    )
  }
  return (
    <>
      {metadata.count > 0 ? (
        renderImages()
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center text-2xl">N/A</h1>
        </div>
      )}
    </>
  )
}
