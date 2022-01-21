import { Center, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import type { NextPage } from 'next'
import { LoginForm } from 'src/components/pages/login/Form'

const LoginPage: NextPage = () => {
  return (
    <Center w="full" h="100vh">
      <VStack as="form" direction="column" w="80" p="4" border="md">
        <Heading size="md">ログイン</Heading>
        <LoginForm />
      </VStack>
    </Center>
  )
}

export default LoginPage
