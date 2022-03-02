import React from 'react'
import { Center, Image, ImageProps, Skeleton } from '@chakra-ui/react'

export const RoundImage: React.FC<ImageProps> = ({ src, alt }) => {
  return (
    <Center>
      <Image
        borderRadius='full'
        draggable='false'
        objectFit='cover'
        boxSize='150px'
        src={src}
        alt={alt}
        fallback={<Skeleton />}
      />
    </Center>
  )
}
