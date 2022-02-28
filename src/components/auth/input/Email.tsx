import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import React from 'react'
import { useAuthFormContext } from '../useAuthForm'

export const Email = () => {
  const { register, errors } = useAuthFormContext()

  return (
    <FormControl id='email' isRequired isInvalid={errors.email}>
      <FormLabel htmlFor='email'>メールアドレス</FormLabel>
      <Input
        id='email'
        type='email'
        {...register('email', {
          required: '入力必須です',
          pattern: {
            value: /[^s]+@[^s]+/,
            message: 'メールアドレスの形式が間違っています。',
          },
        })}
      />
      <FormErrorMessage>
        {errors.email && errors.email.message}
      </FormErrorMessage>
    </FormControl>
  )
}
