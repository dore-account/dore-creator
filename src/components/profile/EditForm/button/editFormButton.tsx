import { Button } from '@chakra-ui/react'
import React from 'react'
import { useEditFormContext } from '../useEditFormContext'

export const EditFormButton = () => {
  const { isValid, isSubmitting } = useEditFormContext()

  return (
    <Button
      type="submit"
      colorScheme="blue"
      disabled={!isValid}
      isLoading={isSubmitting}
    >
      設定
    </Button>
  )
}
