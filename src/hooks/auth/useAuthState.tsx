import { getIdToken, onAuthStateChanged, User } from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { firebaseAuth } from 'src/libs/firebase'

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

const AuthContext = createContext<AuthState>({} as AuthState)

export const useAuthContext = () => {
  return useContext(AuthContext)
}

const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>(INITIAL_AUTH_STATE)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setAuthState({
          isSignedIn: true,
          isLoading: false,
          user: user,
        })
      } else {
        setAuthState({ ...INITIAL_AUTH_STATE, isLoading: false })
      }
      console.log(user)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const currentPath = router.pathname
    const isPublicPath = currentPath.startsWith('/login')
    const user = authState.user
    const loading = authState.isLoading

    if (!loading && !user && !isPublicPath) {
      router.push('/login', currentPath)
    }
  }, [authState.isLoading, authState.user, router])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(
          (registration) => {
            console.log(
              'Service Worker registration successful with scope: ',
              registration.scope
            )
          },
          (err) => {
            console.log('Service Worker registration failed: ', err)
          }
        )
      })
    }
  }, [])

  return authState
}

export const AuthProvider: React.FC = ({ children }) => {
  const authContext = useAuthState()
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  )
}
