import {
  AspectRatio,
  Box,
  Container,
  Heading,
  SimpleGrid,
  Skeleton,
  Stack,
  Image,
  Text,
  useBreakpointValue,
  Button,
  Spacer,
  HStack,
} from '@chakra-ui/react'
import React from 'react'
import { ProductQuery, ProductStatus } from 'src/libs/graphql/graphql'

type Props = {
  productData: ProductQuery
}

export const Product: React.FC<Props> = ({ productData }) => {
  const product = productData.product
  const imagePath = `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.image.path}`

  return (
    <Container maxW='7xl' h='full'>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <AspectRatio ratio={4 / 3}>
          <Image
            src={imagePath}
            alt={product.name}
            objectFit='cover'
            draggable='false'
            fallback={<Skeleton />}
            borderRadius={useBreakpointValue({ base: 'md', md: 'xl' })}
          />
        </AspectRatio>
        <Stack justify='space-between'>
          <Stack spacing={{ base: 4, lg: 6 }}>
            <Box as='header'>
              <Heading fontWeight={600} fontSize={{ base: '3xl', lg: '4xl' }}>
                {product.name}
              </Heading>
            </Box>
            {product.status === ProductStatus.Active ? (
              <HStack justify='space-between'>
                <Text fontWeight={300} fontSize='xl'>
                  在庫
                  <Box fontWeight={500} px='2' as='span' color='red'>
                    {product.stockQuantity}
                  </Box>
                </Text>
                <Text fontWeight={600} fontSize={'3xl'}>
                  {`¥${product.price}`}
                </Text>
              </HStack>
            ) : (
              <Text fontWeight={300} fontSize='xl' color='red'>
                この商品は現在取り扱っていません。
              </Text>
            )}
            <Box>
              <Box as='label' fontSize={'lg'} fontWeight={400}>
                商品詳細：
              </Box>
              <Text fontSize={'xl'}>{product.description}</Text>
            </Box>
          </Stack>
          <Box
            bottom={5}
            right={5}
            left={5}
            position={{ base: 'fixed', lg: 'unset' }}
          >
            <Button
              type='button'
              colorScheme='blue'
              w='full'
              size='lg'
              py='7'
              onClick={() => console.log('tap')}
            >
              購入
            </Button>
          </Box>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
