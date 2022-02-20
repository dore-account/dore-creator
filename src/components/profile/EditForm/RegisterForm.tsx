import { VStack } from '@chakra-ui/react'
import React from 'react'
import { User } from 'src/libs/graphql/graphql'
import {
  InputBirthday,
  InputGender,
  InputImages,
  InputInstagram,
  InputIntroduction,
  InputName,
  InputTiktok,
  InputTwitter,
} from './input/index'
import { EditFormButton } from './button'
import { useEditForm } from './useEditForm'
import { Layout } from 'src/components/layout/layout'
import { EditFormContext } from './EditForm'

type Props = {
  initialUser: User
}

export const RegisterForm: React.FC<Props> = ({ initialUser }) => {
  const handler = useEditForm(initialUser)

  return (
    <EditFormContext.Provider value={handler}>
      <form onSubmit={handler.handleSubmit}>
        <Layout headerProps={{
          title: 'DORE',
          rightComponent: <EditFormButton />,
          leftComponent: <></>
        }}>
          <VStack p={5} spacing={5}>
            <InputImages />
            <InputName />
            <InputGender />
            <InputBirthday />
            <InputIntroduction />
            <InputTwitter />
            <InputInstagram />
            <InputTiktok />
          </VStack>
        </Layout>
      </form>
    </EditFormContext.Provider>
  )
}

