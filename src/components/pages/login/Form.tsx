import React from 'react'
import { auth } from 'firebaseui'

import { firebase, firebaseAuth } from 'src/libs/firebase/index'
import { Center, VStack } from '@chakra-ui/react'
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import FirebaseUIAuth from 'react-firebaseui-localized'

export const uiConfig: auth.Config = {
  callbacks: {
    // signIn成功時の処理
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // var user = authResult.user;
      //       var credential = authResult.credential;
      //       var isNewUser = authResult.additionalUserInfo.isNewUser;
      //       var providerId = authResult.additionalUserInfo.providerId;
      //       var operationType = authResult.operationType;

      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.

      return true
    },
    signInFailure: function (error) {
      // if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
      //   return Promise.resolve();
      // }
      // // The credential the user tried to sign in with.
      // var cred = error.credential;
      // // If using Firebase Realtime Database. The anonymous user data has to be
      // // copied to the non-anonymous user.
      // var app = firebase.app();
      // // Save anonymous user data first.
      // return app.database().ref('users/' + firebase.auth().currentUser.uid)
      //     .once('value')
      //     .then(function(snapshot) {
      //       data = snapshot.val();
      //       // This will trigger onAuthStateChanged listener which
      //       // could trigger a redirect to another page.
      //       // Ensure the upgrade flow is not interrupted by that callback
      //       // and that this is given enough time to complete before
      //       // redirection.
      //       return firebase.auth().signInWithCredential(cred);
      //     })
      //     .then(function(user) {
      //       // Original Anonymous Auth instance now has the new user.
      //       return app.database().ref('users/' + user.uid).set(data);
      //     })
      //     .then(function() {
      //       // Delete anonymnous user.
      //       return anonymousUser.delete();
      //     }).then(function() {
      //       // Clear data in case a new user signs in, and the state change
      //       // triggers.
      //       data = null;
      //       // FirebaseUI will reset and the UI cleared when this promise
      //       // resolves.
      //       // signInSuccessWithAuthResult will not run. Successful sign-in
      //       // logic has to be run explicitly.
      //       window.location.assign('<url-to-redirect-to-on-success>');
      //     });
      // Some unrecoverable error occurred during sign-in.
      // Return a promise when error handling is completed and FirebaseUI
      // will reset, clearing any UI. This commonly occurs for error code
      // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
      // occurs. Check below for more details on this.
      // return handleUIError(error);
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      // loadingの停止
    },
  },
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    GoogleAuthProvider.PROVIDER_ID,
    // TwitterAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/',
  // 利用規約url.
  tosUrl: '<your-tos-url>',
  // プライバシーポリシーurl.
  privacyPolicyUrl: '<your-privacy-policy-url>',
}

export const LoginForm = () => {
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
