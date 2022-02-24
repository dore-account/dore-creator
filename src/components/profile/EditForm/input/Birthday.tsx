import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useEditFormContext } from '../useEditFormContext'

export const InputBirthday = () => {
  const { errors, register } = useEditFormContext()

  return (
    <FormControl
      isRequired
      isInvalid={errors.birth_yy || errors.birth_mm || errors.birth_dd}
    >
      <FormLabel htmlFor='birthday'>生年月日</FormLabel>
      <HStack>
        <Input
          id='birth_yy'
          placeholder='0000'
          type='tel'
          maxLength={4}
          {...register('birth_yy', {
            required: '入力必須です',
            maxLength: {
              value: 4,
              message: '4文字以下で入力してください。',
            },
            minLength: 4,
            pattern: {
              value: /^[0-9]+$/,
              message: '半角数字で入力してください。',
            },
          })}
        />
        <Text fontSize='md'>年</Text>
        <Input
          id='birth_mm'
          placeholder='0'
          type='tel'
          maxLength={2}
          {...register('birth_mm', {
            required: '入力必須です',
            maxLength: {
              value: 2,
              message: '2文字以下で入力してください。',
            },
            pattern: {
              value: /^[0-9]+$/,
              message: '半角数字で入力してください。',
            },
          })}
        />
        <Text fontSize='md'>月</Text>
        <Input
          id='birth_dd'
          placeholder='0'
          type='tel'
          maxLength={2}
          {...register('birth_dd', {
            required: '入力必須です',
            maxLength: {
              value: 2,
              message: '2文字以下で入力してください。',
            },
            pattern: {
              value: /^[0-9]+$/,
              message: '半角数字で入力してください。',
            },
          })}
        />
        <Text fontSize='md'>日</Text>
      </HStack>
      <FormErrorMessage>
        {errors.birth_yy && errors.birth_yy.message}{' '}
      </FormErrorMessage>
      <FormErrorMessage>
        {errors.birth_mm && errors.birth_mm.message}{' '}
      </FormErrorMessage>
      <FormErrorMessage>
        {errors.birth_dd && errors.birth_dd.message}{' '}
      </FormErrorMessage>
    </FormControl>
  )
}
