import { Stack, HStack, Spacer, Button, Divider, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { createContext } from 'react'
import { Email } from './input/Email'
import { Password } from './input/Password'
import { useAuthForm } from './useAuthForm'

type Props = {
  type: string
}

export const AuthFormContext = createContext<ReturnType<typeof useAuthForm>>(
  {} as ReturnType<typeof useAuthForm>
)

export const AuthForm: React.FC<Props> = ({ type }) => {
  const handler = useAuthForm()
  const router = useRouter()

  return (
    <AuthFormContext.Provider value={handler}>
      <form
        onSubmit={
          type == 'signin'
            ? handler.handleSubmit(handler.signIn)
            : handler.handleSubmit(handler.signUp)
        }
      >
        <Stack spacing='6'>
          <Stack spacing='5'>
            <Email />
            <Password />
          </Stack>
          {type == 'signin' && (
            <HStack justify='space-between'>
              <Spacer />
              <Button
                type='button'
                onClick={() => router.push('/sendPassword')}
                variant='link'
                colorScheme='blue'
                size='sm'
              >
                パスワードを忘れた場合
              </Button>
            </HStack>
          )}

          <Stack spacing='6'>
            <Button
              type='submit'
              colorScheme='blue'
              disabled={!handler.isValid}
              isLoading={handler.isSubmitting}
            >
              {type == 'signin' ? 'ログイン' : '登録'}
            </Button>
            <HStack>
              <Divider />
              <Text fontSize='sm' whiteSpace='nowrap' color='muted'>
                または
              </Text>
              <Divider />
            </HStack>
          </Stack>
        </Stack>
      </form>
    </AuthFormContext.Provider>
  )
}
