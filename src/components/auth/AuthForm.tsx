import { Stack, HStack, Spacer, Button, Divider, Text } from '@chakra-ui/react'
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

  return (
    <AuthFormContext.Provider value={handler}>
      <form onSubmit={handler.handleSubmit}>
        <Stack spacing='6'>
          <Stack spacing='5'>
            <Email />
            <Password />
          </Stack>
          {type == 'signin' && (
            <HStack justify='space-between'>
              <Spacer />
              <Button variant='link' colorScheme='blue' size='sm'>
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
