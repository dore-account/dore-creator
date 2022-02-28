import React from 'react'
import { PaymentElement } from '@stripe/react-stripe-js'
import { Button } from '@chakra-ui/react'
import { useSetupForm } from './useSetupForm'

type Props = {
  clientSecret: string
}

export const SetupForm: React.FC<Props> = ({ clientSecret }) => {
  const { onSubmit, stripe, isLoading, message, errorMessage } =
    useSetupForm(clientSecret)

  return (
    <form onSubmit={onSubmit}>
      <PaymentElement />
      <Button
        type='submit'
        disabled={isLoading || !stripe}
        isLoading={isLoading}
        colorScheme='blue'
      >
        保存
      </Button>
      {errorMessage && <div>{errorMessage}</div>}
      {message && <div>{message}</div>}
    </form>
  )
}
