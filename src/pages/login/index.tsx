import { Box, Button, Center, Heading, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { LoginForm } from 'src/components/auth/LoginForm'
import { ActionRouterTextButton } from 'src/components/common/actionRouterTextButton'
import { AuthButton } from 'src/components/common/authButton'
import { Layout } from 'src/components/layout/layout'

export default function LoginPage() {
  return (
    <Center w="full" h="100vh">
      <VStack as="form" direction="column" w="80" p="4" border="md">
        <Heading size="md">DORE</Heading>
        <LoginForm />
      </VStack>
    </Center>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      headerProps={{
        title: 'ログイン',
        rightComponent: (
          <ActionRouterTextButton path={'/signup'} pathName={'登録'} />
        ),
        leftComponent: <></>,
      }}
    >
      {page}
    </Layout>
  )
}
