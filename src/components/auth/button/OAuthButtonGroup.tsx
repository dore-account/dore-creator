import React from 'react'

import { firebase } from 'src/libs/firebase/index'
import FirebaseUIAuth from 'react-firebaseui-localized'
import 'firebase/compat/auth'
import { useOAuthButtonGroup } from './use0AuthButtonGroup'

export const OAuthButtonGroup: React.FC = () => {
  const { uiConfig } = useOAuthButtonGroup()

  return (
    <FirebaseUIAuth
      lang='ja'
      version='4.7.3'
      config={uiConfig}
      auth={firebase.auth()}
      firebase={firebase}
      rtl={undefined}
    />
  )
}
