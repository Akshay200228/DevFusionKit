"use client"

import InfiniteLoader from "./InfiniteLoader"


export default function TemplateCards() {
  

  return (
    <div className='min-h-screen p-4 mx-auto max-w-max'>
      <h1 className="mb-4 text-3xl font-bold text-center">
        All Web temp
      </h1>
      <InfiniteLoader />
    </div>
  )
}