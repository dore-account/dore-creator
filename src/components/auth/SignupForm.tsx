import React from 'react'
import { config, firebase } from 'src/libs/firebase/index'
import { Center, VStack } from '@chakra-ui/react'
import FirebaseUIAuth from 'react-firebaseui-localized'
import { useAuthForm } from './useAuthForm'
import 'firebase/compat/auth'
import 'src/libs/firebase/index'
import { getAuth } from 'firebase/auth'

export const SignupForm: React.FC = () => {
  const { signUpConfig } = useAuthForm()

  return (
    <>
      <Center w="full" h="full" flex="1">
        <VStack as="form" direction="column" w="100" p="4" border="md">
          <FirebaseUIAuth
            lang="ja"
            version="4.7.3"
            config={signUpConfig}
            auth={firebase.auth()}
            firebase={firebase}
            rtl={undefined}
          />
        </VStack>
      </Center>
    </>
  )
}
