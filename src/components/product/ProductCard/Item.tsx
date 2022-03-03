import {
  Box,
  useColorModeValue,
  Image,
  Skeleton,
  AspectRatio,
} from '@chakra-ui/react'
import React from 'react'

type Props = {
  imageURL: string
  name: string
  price: number
}

export const ProductCardItem: React.FC<Props> = ({ imageURL, name, price }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      maxW='sm'
      w='full'
      h="full"
      borderWidth='1px'
      rounded='lg'
      shadow='lg'
      pos='relative'
      textAlign='center'
    >
      <AspectRatio ratio={6 / 5}>
        <Image
          src={imageURL}
          alt={`Picture of ${name}`}
          rounded='lg'
          draggable='false'
          fallback={<Skeleton />}
          objectFit='cover'
        />
      </AspectRatio>
      <Box
        position='absolute'
        bottom={0}
        left={0}
        bg="blackAlpha.700"
        py={1}
        px={2}
        roundedTopRight='lg'
        fontWeight={500}
        fontSize={18}
        color="white"
      >
        {`¥${price}`}
      </Box>
    </Box>
  )
}
