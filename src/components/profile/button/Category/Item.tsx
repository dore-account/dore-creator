import { Button } from '@chakra-ui/react'
import React from 'react'

type Props = {
  name: string
}

export const CategoryItem: React.FC<Props> = ({ name }) => {
  return (
    <Button
      px={4}
      py={1}
      type='button'
      colorScheme='orange'
      variant='outline'
      borderRadius='full'
    >
      {name}
    </Button>
  )
}
