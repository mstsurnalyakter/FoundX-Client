import React, { Suspense } from 'react'
import CardOne from './_components/CardOne'
import CardTwo from './_components/CardTwo'
import CardLoading from './_components/CardLoading'
import ErrorBoundary from './_components/ErrorBoundary'
import CardError from './_components/CardError'

const page = () => {
  return (
    <div>
      {/* suspense is same page different component */}
        <ErrorBoundary fallback={<CardError />}>
       <Suspense fallback={<CardLoading />}>
         <CardOne/>
       </Suspense>
           </ErrorBoundary>
        <Suspense fallback={<CardLoading />}>
         <CardTwo/>
       </Suspense>
    </div>
  )
}

export default page