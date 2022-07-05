import React from 'react'
export default function Footer() {
  return (
    <footer className="flex h-24 w-full items-center justify-center border-t mt-8 -bottom-10 absolute">
      <h1> Something not working? Submit bugs/issues {" "}
        <a
          className="underline text-blue-500 hover:text-blue-800 visited:text-purple-600 hover:cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/nimapourjafar/lil-minter"
        >
          {" "}here
        </a>
        </h1>
      </footer>
  )
}
