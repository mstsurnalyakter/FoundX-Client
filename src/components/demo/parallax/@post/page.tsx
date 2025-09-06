import { delay } from '@/src/utils/delay'
import React from 'react'

const page =  async() => {
    await delay(5000)
  return (
    <div className='h-[400px] w-[400px] bg-teal-300'>
        post
    </div>
  )
}

export default page