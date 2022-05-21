import React from 'react'
import { ImageListType } from 'react-images-uploading'
import ImageCard from './ImageCard'

export default function ViewImages({ images }: { images: ImageListType }) {

  return (
    <div>
      <ImageCard image={images[0]} />
    </div>
  )
}
