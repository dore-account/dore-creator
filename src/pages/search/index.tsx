import React, { ReactElement } from 'react'
import { MainLayout } from 'src/components/layout/MainLayout'
import { Creators } from 'src/components/pages/search/Creators/Creators'

export default function SearchPage() {
  return (
    <Creators />
  )
}

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      headerProps={{
        title: '一覧',
        rightComponent: <></>,
        leftComponent: <></>,
      }}
    >
      {page}
    </MainLayout>
  )
}