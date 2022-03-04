import {
  Box,
  useColorModeValue,
  Image,
  Skeleton,
  AspectRatio,
  Text,
} from '@chakra-ui/react'
import React from 'react'

type Props = {
  imageURL: string
  name: string
  category: string
}

export const ProfileCard: React.FC<Props> = ({ imageURL, name, category }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      maxW='sm'
      w='full'
      h='full'
      borderWidth='1px'
      rounded='lg'
      shadow='lg'
      textAlign='center'
    >
      <AspectRatio ratio={6 / 7}>
        <Image
          src={imageURL}
          alt={`Picture of ${name}`}
          roundedTop='lg'
          draggable='false'
          fallback={<Skeleton />}
          objectFit='cover'
        />
      </AspectRatio>
      <Box textAlign='left' color='black' py={2} px={2}>
        <Text fontSize={18} fontWeight={500}>
          {name}
        </Text>
        <Text fontSize={12}>{category}</Text>
      </Box>
    </Box>
  )
}
