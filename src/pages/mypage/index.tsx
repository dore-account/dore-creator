import React, { ReactElement } from 'react'
import { MainLayout } from 'src/components/layout/MainLayout'
import { Account } from 'src/components/pages/mypage/Account/Account'

export default function Mypage() {
  return <Account />
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
