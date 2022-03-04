import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'

export const ProductCardGridList: React.FC = ({ children }) => {
  return (
    <SimpleGrid
      columns={{ base: 2, lg: 4 }}
      spacing={{ base: 4, lg: 8 }}
      py={2}
    >
      {children}
    </SimpleGrid>
  )
}
