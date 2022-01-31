import { Button } from '@chakra-ui/react'
import { signOut, getAuth } from 'firebase/auth'
import Router from 'next/router'
import React from 'react'
import { useAuthContext } from 'src/hooks/auth/useAuthState'

export const AuthButton: React.FC = () => {
  const { isSignedIn } = useAuthContext()
  return (
    <>
      {isSignedIn ? (
        <Button onClick={() => signOut(getAuth())}>ログアウト</Button>
      ) : (
        <Button onClick={() => Router.push('/login')}>ログイン</Button>
      )}
    </>
  )
}
