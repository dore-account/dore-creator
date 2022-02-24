import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react'
import React from 'react'
import { useEditFormContext } from '../useEditFormContext'

export const InputIntroduction = () => {
  const { register, errors } = useEditFormContext()

  return (
    <FormControl isInvalid={errors.introduction}>
      <FormLabel htmlFor='introduction'>自己紹介</FormLabel>
      <Textarea
        id='introduction'
        {...register('introduction', {
          maxLength: { value: 250, message: '250文字以下で入力してください。' },
        })}
        placeholder='東京の大学生です!好きな食べ物はカレーです!'
      />
      <FormErrorMessage>
        {errors.introduction && errors.introduction.message}{' '}
      </FormErrorMessage>
    </FormControl>
  )
}
