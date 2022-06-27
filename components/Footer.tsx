import React from 'react'
import Image from 'next/image'
export default function Footer() {
  return (
    <footer className="flex h-24 w-full items-center justify-center border-t mt-8">
        <a
          className="flex items-center justify-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with ❤️ by Nima Pourjafar
        </a>
      </footer>
  )
}
