import React, { ReactElement } from 'react'
import { ActionRouterTextButton } from 'src/components/common/Button/ActionRouterTextButton'
import { Layout } from 'src/components/layout/layout'
import { Signup } from 'src/components/pages/auth/signup/Signup'

export default function SignupPage() {
  return <Signup />
}

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      headerProps={{
        title: '登録',
        rightComponent: (
          <ActionRouterTextButton path={'/signin'} pathName={'ログイン'} />
        ),
        leftComponent: <></>,
      }}
    >
      {page}
    </Layout>
  )
}
