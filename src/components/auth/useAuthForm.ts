import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { auth } from 'firebaseui'
import 'firebase/compat/auth'
import { firebase, config } from 'src/libs/firebase'
import { useRouter } from 'next/router'

export const useAuthForm = () => {
  firebase.initializeApp(config)
  const router = useRouter()

  const uiConfig: auth.Config = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // isNewUserがtrueだったらユーザー登録ページに遷移させたい
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        if (isNewUser) {
          router.push('/profile/register')
        } else {
          router.push('/')
        }
        return true;
      },
    },
    signInOptions: [
      {
        provider: EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false,
        fullLabel: 'メール',
        disableSignUp: {
          status: true,
        },
      },
      {
        provider: GoogleAuthProvider.PROVIDER_ID,
        fullLabel: 'Google',
      },
      // TwitterAuthProvider.PROVIDER_ID,
    ],
    // 利用規約url.
    tosUrl: '<your-tos-url>',
    // プライバシーポリシーurl.
    privacyPolicyUrl: '<your-privacy-policy-url>',
  }

  return { uiConfig }
}
