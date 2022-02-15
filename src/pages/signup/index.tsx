import { Center, Heading, VStack } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { AuthForm} from 'src/components/auth/AuthForm'
import { ActionRouterTextButton } from 'src/components/common/Button/actionRouterTextButton'
import { Layout } from 'src/components/layout/layout'

export default function SignupPage() {
  return (
    <Center w="full" h="100vh">
      <VStack as="form" direction="column" w="80" p="4" border="md">
        <Heading size="md">DORE</Heading>
        <AuthForm />
      </VStack>
    </Center>
  )
}

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      headerProps={{
        title: '登録',
        rightComponent: (
          <ActionRouterTextButton path={'/login'} pathName={'ログイン'} />
        ),
        leftComponent: <></>,
      }}
    >
      {page}
    </Layout>
  )
}
