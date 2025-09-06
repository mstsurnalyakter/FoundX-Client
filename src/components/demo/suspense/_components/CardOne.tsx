import { delay } from '@/src/utils/delay'
import React from 'react'

const CardOne = async() => {
    await delay(300);
    throw new Error('Error........')
  return (
   <div className='border border-white h-[400px]'>
        <h1>Card One</h1>
    </div>
  )
}

export default CardOne