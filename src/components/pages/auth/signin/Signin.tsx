import {
  Box,
  useColorModeValue,
  Container,
} from '@chakra-ui/react'
import React from 'react'
import { OAuthButtonGroup } from 'src/components/auth/button/OAuthButtonGroup'
import { AuthForm } from 'src/components/auth/AuthForm'

export const Signin: React.FC = () => {
  return (
    <Container maxW='lg' py={{ base: '12', md: '24' }} px='8'>
      <Box
        py='6'
        px='6'
        bg='bg-surface'
        boxShadow={useColorModeValue('md', 'md-dark')}
        borderRadius='xl'
      >
        <AuthForm type='signin' />
        <OAuthButtonGroup />
      </Box>
    </Container>
  )
}
