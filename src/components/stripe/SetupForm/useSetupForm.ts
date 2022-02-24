import { useElements, useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'

export const useSetupForm = (clientSecret: string) => {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!stripe) return

    ;async () =>
      await stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }) => {
        if (!setupIntent) return

        console.log(setupIntent)

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

  const onSubmit: SubmitHandler<FieldValues> = async (event) => {
    console.log('pre')
    // event.preventDefault()
    console.log('ontap')

    if (!stripe || !elements) return

    setIsLoading(true)
    console.log('loading')

    const result = await stripe.confirmSetup({
      elements,
      redirect: 'if_required',
    })
    console.log(result)

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
    isLoading,
    message,
    errorMessage,
  }
}
