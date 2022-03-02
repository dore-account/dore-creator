import { Stack } from '@chakra-ui/react'
import React from 'react'

export const CategoryList: React.FC = ({ children }) => {
  return (
    <Stack align={'center'} justify={'center'} direction={'row'} mt={4}>
      {children}
    </Stack>
  )
}
