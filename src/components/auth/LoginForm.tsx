import React from 'react'

import { firebase, getFirebaseApp } from 'src/libs/firebase/index'
import { Center, VStack } from '@chakra-ui/react'
import FirebaseUIAuth from 'react-firebaseui-localized'
import 'firebase/compat/auth'
import { useAuthForm } from './useAuthForm'

export const LoginForm: React.FC = () => {
  const { signInConfig } = useAuthForm()

  return (
    <>
      <Center w="full" h="full" flex="1">
        <VStack as="form" direction="column" w="100" p="4" border="md">
          <FirebaseUIAuth
            lang="ja"
            version="4.7.3"
            config={signInConfig}
            auth={firebase.auth()}
            firebase={firebase}
            rtl={undefined}
          />
        </VStack>
      </Center>
    </>
  )
}
