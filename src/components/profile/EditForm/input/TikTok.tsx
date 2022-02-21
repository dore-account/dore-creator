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
import { FaTiktok } from 'react-icons/fa'
import { useEditFormContext } from '../useEditFormContext'

export const InputTiktok = () => {
  const { register, errors } = useEditFormContext()

  return (
    <FormControl isInvalid={errors.tiktok}>
      <HStack>
        <FormLabel htmlFor="tiktok" w={170}>
          <HStack>
            <Icon as={FaTiktok} />
            <Text>Tiktok</Text>
          </HStack>
        </FormLabel>
        <Input
          id="tiktok"
          placeholder="@ユーザーID"
          {...register('tiktok', {
            pattern: {
              value: /@[\w\-._]/,
              message: '@マークから入力してください。',
            },
          })}
        />
      </HStack>

      <FormErrorMessage>
        {errors.tiktok && errors.tiktok.message}
      </FormErrorMessage>
    </FormControl>
  )
}

