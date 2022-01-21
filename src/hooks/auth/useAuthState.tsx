import { onAuthStateChanged, User } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react';
import { firebaseAuth } from 'src/libs/firebase';

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

const AuthContext = createContext<AuthState>({} as AuthState);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>(INITIAL_AUTH_STATE);

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
  })

  return () => unsubscribe();
  }, [])
  return authState;
}

export const AuthProvider: React.FC = ({ children }) => {
  const authContext = useAuthState();
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  )
};

