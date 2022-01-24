import { Center, Heading, VStack } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { LoginForm } from 'src/components/pages/login/Form'
import { SignOutButton } from 'src/components/common/signOutButton'
import { Layout } from 'src/components/layout/layout'

export default function LoginPage() {
  return (
    <Center w="full" h="100vh">
      <VStack as="form" direction="column" w="80" p="4" border="md">
        <Heading size="md">ログイン</Heading>
        <LoginForm />
      </VStack>
    </Center>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      headerProps={{
        title: 'home',
        rightComponent: <SignOutButton />,
        leftComponent: <></>,
      }}
    >
      {page}
    </Layout>
  )
}
