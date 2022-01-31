import React from 'react'

import { firebase, firebaseAuth } from 'src/libs/firebase/index'
import { Center, VStack } from '@chakra-ui/react'
import FirebaseUIAuth from 'react-firebaseui-localized'
import { useLoginForm } from './useLoginForm'

export const LoginForm: React.FC = () => {
  const { uiConfig } = useLoginForm()
  return (
    <>
      <Center w="full" h="full" flex="1">
        <VStack as="form" direction="column" w="100" p="4" border="md">
          <FirebaseUIAuth
            lang="ja"
            version="4.7.3"
            config={uiConfig}
            auth={firebaseAuth}
            firebase={firebase}
            rtl={undefined}
          />
        </VStack>
      </Center>
    </>
  )
}
