import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react'
import React from 'react'
import { useEditFormContext } from './useEditFormContext'

export const InputName = () => {
  const { register, errors } = useEditFormContext()

  return (
    <FormControl isRequired isInvalid={errors.name}>
      <FormLabel htmlFor="name">name</FormLabel>
      {/* <Editable
        id="name"
        placeholder="test@example.com"
        defaultValue="Take some chakra"
        {...register('name', {
          required: 'This is required',
          minLength: { value: 4, message: 'Minimum length should be 4' },
        })}
      >
        <EditablePreview />
        <EditableInput />
      </Editable> */}
      <Input
        id="name"
        placeholder="test@example.com"
        {...register('name', {
          required: 'This is required',
          minLength: { value: 4, message: 'Minimum length should be 4' },
        })}
      />
      <FormErrorMessage>{errors && errors.message} </FormErrorMessage>
    </FormControl>
  )
}

