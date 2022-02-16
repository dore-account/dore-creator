import { VStack } from '@chakra-ui/react'
import React, { createContext } from 'react'
import { User } from 'src/libs/graphql/graphql'
import { InputImage } from './input/Image'
import { InputName } from './input/Name'
import { useEditForm } from './useEditForm'

type Props = {
  initialUser: User
}

export const EditFormContext = createContext<ReturnType<typeof useEditForm>>(
  {} as ReturnType<typeof useEditForm>
)

export const EditForm: React.FC<Props> = ({ initialUser }) => {
  const handler = useEditForm(initialUser)

  return (
    <EditFormContext.Provider value={handler}>
      <VStack>
        <InputName />
        <InputImage />
      </VStack>
    </EditFormContext.Provider>
  )
}
