import { Box, CloseButton, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { ImageInput } from 'src/components/common/Image/ImageInput'
import { useEditFormContext } from '../useEditFormContext'

export const InputImages = () => {
  const { user, handleImageInputChange, handleImageDelete } =
    useEditFormContext()

  return (
    <SimpleGrid
      columns={{ base: 3, lg: 4 }}
      spacing={{ base: 4, lg: 8 }}
      py={2}
    >
      {[...Array(6)]
        .map((_, i) => user.images[i] || { id: '', path: '' })
        .map(({ id, path }, i) => (
          <Box key={id + i.toString()} position='relative'>
            <ImageInput
              id={`images_${id}`}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`}
              onChangeImage={handleImageInputChange}
            />
            {id !== '' && (
              <CloseButton
                position='absolute'
                top={0}
                right={0}
                size='sm'
                onClick={handleImageDelete(id)}
              />
            )}
          </Box>
        ))}
    </SimpleGrid>
  )
}
