import React from 'react'
import Image from 'next/image'
export default function Footer() {
  return (
    <footer className="flex h-24 w-full items-center justify-center border-t mt-8 absolute bottom-0">
        <a
          className="underline text-blue-500 hover:text-blue-800 visited:text-purple-600 hover:cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/nimapourjafar/lil-minter"
        >
          Source Code
        </a>
      </footer>
  )
}
