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
import { BsInstagram } from 'react-icons/bs'
import { useEditFormContext } from '../useEditFormContext'

export const InputInstagram = () => {
  const { register, errors } = useEditFormContext()

  return (
    <FormControl isInvalid={errors.instagram}>
      <HStack>
        <FormLabel htmlFor='instagram' w={170}>
          <HStack>
            <Icon as={BsInstagram} />
            <Text>Instagram</Text>
          </HStack>
        </FormLabel>
        <Input
          id='instagram'
          placeholder='ユーザーID'
          {...register('instagram')}
        />
      </HStack>

      <FormErrorMessage>
        {errors.instagram && errors.instagram.message}
      </FormErrorMessage>
    </FormControl>
  )
}
