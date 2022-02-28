import {
  Container,
  Box,
  useColorModeValue,
  VStack,
  Text,
  Stack,
} from '@chakra-ui/react'
import React from 'react'
import { SendPasswordResetForm } from 'src/components/auth/SendPasswordResetForm'

export const SendPasswordReset = () => {
  return (
    <Container maxW='lg' py={{ base: '12', md: '24' }} px='8'>
      <Stack w='full' spacing='6'>
        <Box
          py='6'
          px='6'
          bg='bg-surface'
          boxShadow={useColorModeValue('md', 'md-dark')}
          borderRadius='xl'
        >
          <SendPasswordResetForm />
        </Box>
        <Text fontSize={'lg'} color={'gray.600'}>
          このメールアドレスに送信された、パスワードの再設定方法をご確認ください。
        </Text>
      </Stack>
    </Container>
  )
}
