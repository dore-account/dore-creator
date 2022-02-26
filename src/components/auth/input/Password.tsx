import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuthFormContext } from '../useAuthForm'

export const Password = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { register, errors } = useAuthFormContext()

  return (
    <FormControl id='password' isRequired isInvalid={errors.password}>
      <FormLabel htmlFor='password'>パスワード</FormLabel>
      <InputGroup>
        <Input
          id='password'
          type={showPassword ? 'text' : 'password'}
          {...register('password', { required: '入力必須です。' })}
        />
        <InputRightElement h={'full'}>
          <Button
            variant={'ghost'}
            onClick={() => setShowPassword((showPassword) => !showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>
        {errors.password && errors.password.message}
      </FormErrorMessage>
    </FormControl>
  )
}
