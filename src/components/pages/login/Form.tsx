import React from 'react'
import { auth } from 'firebaseui'
import { EmailAuthProvider,  GoogleAuthProvider } from 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { firebaseAuth } from 'src/libs/firebase/index'

const uiConfig: auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    // GoogleAuthProvider.PROVIDER_ID,
    // TwitterAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/',
}

export const LoginForm = () => {
  return <StyledFirebaseAuth firebaseAuth={firebaseAuth} uiConfig={uiConfig} />
}
