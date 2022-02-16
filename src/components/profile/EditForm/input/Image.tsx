import { Grid, Box, CloseButton } from '@chakra-ui/react'
import React from 'react'
import { ImageInput } from 'src/components/common/Image/ImageInput'
import { useEditFormContext } from './useEditFormContext'

export const InputImage = () => {
  const { user, handleImageInputChange, handleImageDelete } =
    useEditFormContext()

  console.log(user)
  console.log(user.images)
  console.log(
    [...Array(6)].map((_, i) =>
      user?.images ? user.images[i] : { id: '', path: '' }
    )
  )

  return (
    <Grid
      templateColumns="repeat(3, auto)"
      templateRows="repeat(3, auto)"
      gap={6}
    >
      {[...Array(6)]
        .map((_, i) => (user.images[i] || { id: '', path: '' }))
        .map(({id, path}, i) => (
          <Box key={id + i.toString()} position="relative">
            <ImageInput
              id={`images_${id}`}
              src={path}
              onChangeImage={handleImageInputChange}
            />
            {id !== '' && (
              <CloseButton
                position="absolute"
                top={0}
                right={0}
                size="sm"
                onClick={handleImageDelete(id)}
              />
            )}
          </Box>
        ))}
    </Grid>
  )
}
