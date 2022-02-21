import React from 'react'

import { firebase } from 'src/libs/firebase/index'
import { Center, VStack } from '@chakra-ui/react'
import FirebaseUIAuth from 'react-firebaseui-localized'
import 'firebase/compat/auth'
import { useAuthForm } from './useAuthForm'

export const AuthForm: React.FC = () => {
  const { uiConfig } = useAuthForm()

  return (
    <>
      <Center w="full" h="full" flex="1">
        <VStack as="form" direction="column" w="100" p="4" border="md">
          <FirebaseUIAuth
            lang="ja"
            version="4.7.3"
            config={uiConfig}
            auth={firebase.auth()}
            firebase={firebase}
            rtl={undefined}
          />
        </VStack>
      </Center>
    </>
  )
}
