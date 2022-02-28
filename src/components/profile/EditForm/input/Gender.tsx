import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  RadioGroup,
  Radio,
  Stack
} from '@chakra-ui/react'
import React from 'react'
import { Controller } from 'react-hook-form'
import { useEditFormContext } from '../useEditFormContext'

export const InputGender = () => {
  const { errors, control } = useEditFormContext()

  return (
    <FormControl isRequired isInvalid={errors.gender && true}>
      <FormLabel htmlFor='gender'>性別</FormLabel>
      <Controller
        name='gender'
        control={control}
        rules={{ required: 'どちらか選択してください。' }}
        render={({ field: { onChange, value, ref } }) => (
          <RadioGroup
            id='gender'
            ref={ref}
            name='gender'
            onChange={onChange}
            value={value}
          >
            <Stack spacing={5} direction='row'>
              <Radio value='male'>男性</Radio>
              <Radio value='woman'>女性</Radio>
            </Stack>
          </RadioGroup>
        )}
      />
      <FormErrorMessage>
        {errors.gender && errors.gender.message}{' '}
      </FormErrorMessage>
    </FormControl>
  )
}
