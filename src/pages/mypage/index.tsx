import React, { ReactElement } from 'react'
import { AuthButton } from 'src/components/auth/button/authButton'
import { MainLayout } from 'src/components/layout/MainLayout'

export default function Mypage() {
  return (
    <div>Mypage</div>
  )
}

Mypage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      headerProps={{
        title: 'マイページ',
        rightComponent: <></>,
        leftComponent: <></>,
      }}
    >
      {page}
    </MainLayout>
  )
}