import { Box, Heading, Button, Text, Center, Container } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Custom404() {
  const router = useRouter()

  return (
    <Container maxW='7xl' h='full' py={8}>
      <Box textAlign='center' py={10} px={6}>
        <Heading
          display='inline-block'
          as='h2'
          size='2xl'
          bgGradient='linear(to-r, teal.400, teal.600)'
          backgroundClip='text'
        >
          404
        </Heading>
        <Text fontSize='18px' mt={3} mb={2}>
          ページが見つかりません。
        </Text>
        <Text color={'gray.500'} mb={6}>
          お探しのページが存在しないようです。
        </Text>

        <Button
          type='button'
          onClick={() => router.push('/')}
          colorScheme='teal'
          bgGradient='linear(to-r, teal.400, teal.500, teal.600)'
          color='white'
          variant='solid'
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  )
}
