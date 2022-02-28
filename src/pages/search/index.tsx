import React, { ReactElement } from 'react'
import { MainLayout } from 'src/components/layout/MainLayout'

export default function SearchPage() {
  return (
    <div>SearchPage</div>
  )
}

SearchPage.getLayout = function getLayout(page: ReactElement) {
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