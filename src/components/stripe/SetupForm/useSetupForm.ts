import { useElements, useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useSetupForm = (clientSecret: string) => {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!stripe) return

    stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }) => {
      if (!setupIntent) return
      switch (setupIntent.status) {
        case 'succeeded':
          setMessage('Success! ')
          break

        case 'processing':
          setMessage(
            '支払いの詳細を処理しています。処理が完了したら更新します。'
          )
          break

        case 'requires_payment_method':
          setMessage(
            '支払いの詳細を処理できませんでした。別の支払い方法を試してください。'
          )
          break
      }
    })
  }, [clientSecret, stripe])

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsLoading(true)

    const result = await stripe.confirmSetup({
      elements,
      redirect: 'if_required',
    })

    if (result.error) {
      setErrorMessage(result.error.message!)
    } else {
      router.push('/')
    }

    setIsLoading(false)
  }

  return {
    onSubmit,
    stripe,
    elements,
    isLoading,
    message,
    errorMessage,
  }
}
