import { useState, useEffect } from 'react'
import { useSetupPaymentMethodQuery } from 'src/libs/graphql/graphql'
import { getStripe } from 'src/libs/stripe'

export const useNewPaymentMethod = () => {
  const [stripePromise, setStripePromise] = useState<any>({})
  const { data, loading, error } = useSetupPaymentMethodQuery()
  const clientSecret = data?.setupPaymentMethod.clientSecret
  const errorMessage = error?.message

  useEffect(() => {
    ;(async () => {
      const stripe = await getStripe()
      if (stripe != null) {
        setStripePromise(stripe)
      }
    })()
  }, [])

  const options = {
    theme: 'flat',
    clientSecret: clientSecret,
  }

  return {
    stripePromise,
    clientSecret,
    options,
    loading,
    errorMessage,
  }
}
