import React from 'react'

import { firebaseAuth, firebase, getFirebaseApp, config } from 'src/libs/firebase/index'
import { Center, VStack } from '@chakra-ui/react'
import FirebaseUIAuth from 'react-firebaseui-localized'
import { useLoginForm } from './useLoginForm'
import 'firebase/compat/auth'
import 'src/libs/firebase/index'


export const LoginForm: React.FC = () => {
  const { uiConfig } = useLoginForm()
  firebase.initializeApp(config);

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
