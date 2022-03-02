import React from 'react'
import { Loader } from 'src/components/common/loader'
import { EditForm } from 'src/components/profile/EditForm/EditForm'
import { useCurrentUserQuery } from 'src/libs/graphql/graphql'

export const EditProfile = () => {
  const { data } = useCurrentUserQuery()

  if (!data) return <Loader />

  return <EditForm initialUser={data?.user} isEdit={true} />
}
