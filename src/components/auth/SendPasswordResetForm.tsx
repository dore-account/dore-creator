import { Button, Stack } from '@chakra-ui/react'
import React from 'react'
import { AuthFormContext } from './AuthForm'
import { Email } from './input/Email'
import { useAuthForm } from './useAuthForm'

export const SendPasswordResetForm = () => {
  const handler = useAuthForm()
  return (
    <AuthFormContext.Provider value={handler}>
      <form onSubmit={handler.handleSubmit(handler.sendPasswordReset)}>
        <Stack spacing='6'>
          <Stack spacing='5'>
            <Email />
          </Stack>
          <Button
            type='submit'
            colorScheme='blue'
            disabled={!handler.isValid}
            isLoading={handler.isSubmitting}
          >
            送信
          </Button>
        </Stack>
      </form>
    </AuthFormContext.Provider>
  )
}
