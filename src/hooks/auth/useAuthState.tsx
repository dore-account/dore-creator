import { getIdToken, onIdTokenChanged, User } from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import nookies from 'nookies'
import { firebase, getFirebaseApp } from 'src/libs/firebase'

export type AuthState = {
  isSignedIn: boolean
  isLoading: boolean
  user: User | null
}

const INITIAL_AUTH_STATE = {
  isSignedIn: false,
  isLoading: true,
  user: null,
}

const PublicPaths: string[] = ['/signin', '/signup']

const AuthContext = createContext<AuthState>({} as AuthState)

export const useAuthContext = () => {
  return useContext(AuthContext)
}

const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>(INITIAL_AUTH_STATE)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(
      firebase.auth(getFirebaseApp()),
      async (user) => {
        if (user) {
          const idToken = await getIdToken(user)
          // jwtをcookieに保存
          nookies.set(null, 'ID_TOKEN', idToken, {})
          setAuthState({
            isSignedIn: true,
            isLoading: false,
            user: user,
          })
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

  return authState
}

export const AuthProvider: React.FC = ({ children }) => {
  const authContext = useAuthState()
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  )
}
