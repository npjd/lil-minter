import React from 'react'

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <>
      <div className="mb-1 text-base font-medium dark:text-white">Default</div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-gray-600 h-2.5 rounded-full dark:bg-gray-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </>
  )
}
