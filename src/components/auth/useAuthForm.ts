import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { auth } from 'firebaseui'
import 'firebase/compat/auth'
import { getFirebaseApp, firebase, config } from 'src/libs/firebase'

export const useAuthForm = () => {
  firebase.initializeApp(config)

  const signUpConfig: auth.Config = {
    signInSuccessUrl: '/',
    signInOptions: [
      {
        provider: EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false,
        fullLabel: 'メールで登録',
        disableSignUp: {
          status: true,
        },
      },
      {
        provider: GoogleAuthProvider.PROVIDER_ID,
        fullLabel: 'Googleで登録',
      },
      // TwitterAuthProvider.PROVIDER_ID,
    ],
    // 利用規約url.
    tosUrl: '<your-tos-url>',
    // プライバシーポリシーurl.
    privacyPolicyUrl: '<your-privacy-policy-url>',
  }

  const signInConfig: auth.Config = {
    signInSuccessUrl: '/',
    signInOptions: [
      {
        provider: EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false,
        fullLabel: 'メールでログイン',
        disableSignUp: {
          status: true,
        },
      },
      {
        provider: GoogleAuthProvider.PROVIDER_ID,
        fullLabel: 'Googleでログイン',
      },
      // TwitterAuthProvider.PROVIDER_ID,
    ],
    // 利用規約url.
    tosUrl: '<your-tos-url>',
    // プライバシーポリシーurl.
    privacyPolicyUrl: '<your-privacy-policy-url>',
  }

  return { signUpConfig, signInConfig }
}
