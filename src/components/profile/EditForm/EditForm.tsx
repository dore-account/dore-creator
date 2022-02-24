import { VStack } from '@chakra-ui/react'
import React, { createContext } from 'react'
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
import { ArrowBackIconButton } from 'src/components/common/Button/arrowBackIconButton'

type Props = {
  initialUser: User
  isEdit: boolean
}

export const EditFormContext = createContext<ReturnType<typeof useEditForm>>(
  {} as ReturnType<typeof useEditForm>
)

export const EditForm: React.FC<Props> = ({ initialUser, isEdit }) => {
  const handler = useEditForm(initialUser)

  return (
    <EditFormContext.Provider value={handler}>
      <form onSubmit={handler.handleSubmit}>
        <Layout headerProps={{
          title: 'DORE',
          rightComponent: <EditFormButton />,
          leftComponent: isEdit ? <ArrowBackIconButton /> : <></>
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
