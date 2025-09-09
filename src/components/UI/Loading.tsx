import { Spinner } from '@heroui/spinner'
import React from 'react'

const Loading = () => {
  return (
    <div className='h-screen bg-black/10 flex justify-center items-center fixed inset-0 z-[999] backdrop-blur-md'>
      <Spinner size='lg' />
    </div>
  )
}

export default Loading