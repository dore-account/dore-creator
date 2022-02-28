import React from 'react'
import { EditForm } from 'src/components/profile/EditForm/EditForm'
import { GenderStatus } from 'src/libs/graphql/graphql'

const INITIAL_USER = {
  id: '',
  slug: '',
  name: '',
  introduction: '',
  gender: GenderStatus.Male,
  age: 0,
  birthDayYy: 1,
  birthDayMm: 1,
  birthDayDd: 1,
  twitterLink: '',
  instagramLink: '',
  tiktokLink: '',
  images: [],
  info: { id: '', stan: '', userId: '' },
}

export const RegisterProfile = () => {
  return <EditForm initialUser={INITIAL_USER} isEdit={false} />
}
