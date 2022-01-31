import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { auth } from 'firebaseui'
import 'firebase/compat/auth';

export const useLoginForm = () => {
  const uiConfig: auth.Config = {
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

  return { uiConfig }
}
