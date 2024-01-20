"use client"

import InfiniteLoader from "./InfiniteLoader"

export default function TemplateCards() {

  return (
    <div className='max-w-full min-h-screen p-4 mx-2 md:mx-4'>
      <h1 className="mb-4 text-3xl font-bold text-center">
        All Web temp
      </h1>
      <InfiniteLoader />
    </div>
  )
}