import React from 'react'

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <>
      <div className="w-full bg-gray-200 rounded-full h-2.5 ">
        <div
          className="bg-green-400 h-2.5 rounded-full "
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </>
  )
}
