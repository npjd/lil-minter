import Image from 'next/image'
import React from 'react'
import { ImageType } from 'react-images-uploading'

export default function ImageCard({ image }: { image: ImageType }) {
  return (
    <div className="rounded bg-gray-100 shadow-md h-72 w-60 flex flex-col">
      {image.dataURL == undefined ? (
        <h1>Image could not be found!</h1>
      ) : (
        <Image src={image.dataURL} />
      )}
      <div className="justify-self-end justify-end bg-white">
          <p>Name:Bruh</p>
          <p>Name:Bruh</p>
          <p>Name:Bruh</p>
      </div>

    </div>
  )
}
