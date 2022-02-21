import React from 'react'
import { RegisterForm } from 'src/components/profile/EditForm/RegisterForm'
import { GenderStatus } from 'src/libs/graphql/graphql'

const INITIAL_USER = {id: '', slug: '', name: '', introduction: '', gender: GenderStatus.Male, age: 0, birthDayYy: 1, birthDayMm: 1, birthDayDd: 1, twitterLink: '', instagramLink: '', tiktokLink: '', images: [], info: {id: '', stan: '', userId: ''}}

export default function ProfileRegisterPage() {
  return <RegisterForm initialUser={INITIAL_USER} />
}