import { Button } from '@chakra-ui/react'
import { signOut, getAuth } from 'firebase/auth'
import React from 'react'
import { useAuthContext } from 'src/hooks/auth/useAuthState'
import { useRouter } from 'next/router'

export const AuthButton: React.FC = () => {
  const { isSignedIn, isLoading } = useAuthContext()
  const router = useRouter()

  return (
    <>
      {isSignedIn ? (
        <Button isLoading={isLoading} onClick={() => signOut(getAuth())}>ログアウト</Button>
      ) : (
        <Button isLoading={isLoading} onClick={() => router.push('/signin')}>ログイン</Button>
      )}
    </>
  )
}
