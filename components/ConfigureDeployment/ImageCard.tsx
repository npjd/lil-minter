import React from 'react'
import { ImageType } from 'react-images-uploading'

export default function ImageCard({
  image,
  index,
  metadata,
}: {
  image: ImageType
  index: number
  metadata: {
    name: string
    description: string
    count: number
  }
}) {
  const renderMetadataString = (string:string):string =>{
    let newString = string.replace("`index`",index.toString())
    newString = newString.replace("`count`", metadata.count.toString())
    return newString
  }
  console.log(image)
  return (
    <div className="rounded flex-shrink-0 bg-gray-100 shadow-md h-80 w-60 flex flex-col border-2 border-gray-200">
      {image['data_url'] == undefined ? (
        <h1>Image could not be found!</h1>
      ) : (
        <img src={image['data_url']} />
      )}
      <div className="justify-self-end justify-start bg-white h-full ">
        <p>Name: {renderMetadataString(metadata.name)}</p>
        <p>Description: {renderMetadataString(metadata.description)}</p>
      </div>
    </div>
  )
}
