import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  RadioGroup,
  Radio,
} from '@chakra-ui/react'
import React from 'react'
import { Controller } from 'react-hook-form'
import { useEditFormContext } from '../useEditFormContext'

export const InputGender = () => {
  const { errors, control } = useEditFormContext()

  return (
    <FormControl isRequired isInvalid={errors.gender}>
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
            isInline
            spacing={6}
            onChange={onChange}
            value={value}
          >
            <Radio value='MALE'>男性</Radio>
            <Radio value='FEMALE'>女性</Radio>
          </RadioGroup>
        )}
      />
      <FormErrorMessage>
        {errors.gender && errors.gender.message}{' '}
      </FormErrorMessage>
    </FormControl>
  )
}
