import React, { ReactElement } from 'react'
import { ActionRouterTextButton } from 'src/components/common/Button/actionRouterTextButton'
import { Layout } from 'src/components/layout/layout'
import { Signin } from 'src/components/pages/auth/signin/Signin'

export default function SigninPage() {
  return (
    <Signin />
  )
}

SigninPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      headerProps={{
        title: '',
        rightComponent: (
          <ActionRouterTextButton path={'/signup'} pathName={'登録'} />
        ),
        leftComponent: <></>,
      }}
    >
      {page}
    </Layout>
  )
}
