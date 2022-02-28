import { Container, Box, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { AuthForm } from 'src/components/auth/AuthForm'
import { OAuthButtonGroup } from 'src/components/auth/button/OAuthButtonGroup'

export const Signup = () => {
  return (
    <Container maxW='lg' py={{ base: '12', md: '24' }} px='8'>
      <Box
        py='6'
        px='6'
        bg='bg-surface'
        boxShadow={useColorModeValue('md', 'md-dark')}
        borderRadius='xl'
      >
        <AuthForm type='signup' />
        <OAuthButtonGroup />
      </Box>
    </Container>
  )
}
