import { Spinner } from '@chakra-ui/react'
import React from 'react'
import { EditForm } from 'src/components/profile/EditForm/EditForm'
import { useUserQuery } from 'src/libs/graphql/graphql'

export default function ProfileEditPage() {
  const { data } = useUserQuery()

  if (!data) return <Spinner />

  return <EditForm initialUser={data?.user} />
}
