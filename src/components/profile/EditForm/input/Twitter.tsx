import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Icon,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { BsTwitter } from 'react-icons/bs'
import { useEditFormContext } from '../useEditFormContext'

export const InputTwitter = () => {
  const { register, errors } = useEditFormContext()

  return (
    <FormControl isInvalid={errors.twitter}>
      <HStack>
        <FormLabel htmlFor='twitter' w={170}>
          <HStack>
            <Icon as={BsTwitter} />
            <Text>Twitter</Text>
          </HStack>
        </FormLabel>
        <Input
          id='twitter'
          placeholder='@ユーザーID'
          {...register('twitter', {
            pattern: {
              value: /@[\w\-._]/,
              message: '@マークから入力してください。',
            },
          })}
        />
      </HStack>

      <FormErrorMessage>
        {errors.twitter && errors.twitter.message}
      </FormErrorMessage>
    </FormControl>
  )
}
