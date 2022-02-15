import { Button } from '@chakra-ui/react'
import { signOut, getAuth } from 'firebase/auth'
import React from 'react'
import { useAuthContext } from 'src/hooks/auth/useAuthState'
import { useRouter } from 'next/router'

export const AuthButton: React.FC = () => {
  const { isSignedIn } = useAuthContext()
  const router = useRouter()

  return (
    <>
      {isSignedIn ? (
        <Button onClick={() => signOut(getAuth())}>ログアウト</Button>
      ) : (
        <Button onClick={() => router.push('/login')}>ログイン</Button>
      )}
    </>
  )
}
