import {
  createUserWithEmailAndPassword,
  getIdToken,
  onIdTokenChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import nookies from 'nookies'
import { firebase, getFirebaseApp } from 'src/libs/firebase'

export type AuthState = {
  isSignedIn: boolean
  isLoading: boolean
  user: User | null
}

type Auth = {
  authState: AuthState
  signInWithEmail: (email: string, password: string) => Promise<boolean>
  signUpWithEmail: (email: string, password: string) => Promise<boolean>
  passwordReset: (email: string) => Promise<boolean>
}

const INITIAL_AUTH_STATE = {
  isSignedIn: false,
  isLoading: true,
  user: null,
}

const PublicPaths: string[] = ['/signin', '/signup', '/sendPassword']

const AuthContext = createContext<Auth>({} as Auth)

export const useAuthContext = () => {
  return useContext(AuthContext)
}

const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>(INITIAL_AUTH_STATE)
  const router = useRouter()

  const setIdToken = async (user: User) => {
    const idToken = await getIdToken(user)
    // jwtをcookieに保存
    nookies.set(null, 'ID_TOKEN', idToken, {})
    setAuthState({
      isSignedIn: true,
      isLoading: false,
      user: user,
    })
  }

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(
      firebase.auth(getFirebaseApp()),
      async (user) => {
        if (user) {
          setIdToken(user)
        } else {
          // cookiesを削除
          nookies.destroy(null, 'ID_TOKEN')
          // ユーザーがログアウトしたらcookieを破棄
          nookies.set(null, 'ID_TOKEN', '', {})
          setAuthState({ ...INITIAL_AUTH_STATE, isLoading: false })
        }
      }
    )

    return () => unsubscribe()
  }, [router])

  useEffect(() => {
    const currentPath = router.pathname
    const isPublicPath = PublicPaths.some((path) =>
      currentPath.startsWith(path)
    )
    const user = authState.user
    const loading = authState.isLoading

    if (!loading && !user && !isPublicPath) {
      router.push('/signin', currentPath)
    }
  }, [authState.isLoading, authState.user, router])

  const signInWithEmail = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    setAuthState({ ...authState, isLoading: true })
    const result = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          firebase.auth(getFirebaseApp()),
          email,
          password
        )
        await setIdToken(userCredential.user)
        return true
      } catch {
        return false
      }
    }

    setAuthState({ ...authState, isLoading: false })
    return result()
  }

  const signUpWithEmail = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    setAuthState({ ...authState, isLoading: true })
    const result = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          firebase.auth(getFirebaseApp()),
          email,
          password
        )
        await setIdToken(userCredential.user)
        return true
      } catch {
        return false
      }
    }

    setAuthState({ ...authState, isLoading: false })
    return result()
  }

  const passwordReset = async (email: string): Promise<boolean> => {
    const resutl = await sendPasswordResetEmail(
      firebase.auth(getFirebaseApp()),
      email
    )
      .then(() => {
        return true
      })
      .catch((e) => {
        console.log(e.message)
        return false
      })

    return resutl
  }

  return { authState, signInWithEmail, signUpWithEmail, passwordReset }
}

export const AuthProvider: React.FC = ({ children }) => {
  const authContext = useAuthState()
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  )
}
