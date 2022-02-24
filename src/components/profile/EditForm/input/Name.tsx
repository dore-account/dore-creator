import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import React from 'react'
import { useEditFormContext } from '../useEditFormContext'

export const InputName = () => {
  const { register, errors } = useEditFormContext()

  return (
    <FormControl isRequired isInvalid={errors.name}>
      <FormLabel htmlFor='name'>名前</FormLabel>
      <Input
        id='name'
        placeholder='山田 太朗'
        {...register('name', {
          required: '入力必須です',
        })}
      />
      <FormErrorMessage>{errors.name && errors.name.message} </FormErrorMessage>
    </FormControl>
  )
}
