import { Elements } from '@stripe/react-stripe-js'
import React from 'react'
import { Loader } from 'src/components/common/loader'
import { SetupForm } from 'src/components/stripe/SetupForm/SetupForm'
import { useNewPaymentMethod } from './useNewPaymentMethod'

export const NewPaymentMethod: React.FC = () => {
  const { stripePromise, options, clientSecret, loading, errorMessage } =
    useNewPaymentMethod()

  if (loading) return <Loader />

  return (
    <>
      {stripePromise && clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <SetupForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <>{errorMessage}</>
      )}
    </>
  )
}
