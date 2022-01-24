import { Button } from '@chakra-ui/react'
import { signOut, getAuth } from 'firebase/auth'
import Router from 'next/router'
import React from 'react'
import { useAuthContext } from 'src/hooks/auth/useAuthState'

export const SignOutButton: React.FC = () => {
  const { isSignedIn } = useAuthContext()
  return (
    <>
      {isSignedIn ? (
        <Button onClick={() => signOut(getAuth())}>Sign-out</Button>
      ) : (
        <Button onClick={() => Router.push('/signin')}>Sign-in</Button>
      )}
    </>
  )
}
