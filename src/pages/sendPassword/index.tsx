import React, { ReactElement } from 'react'
import { ArrowBackIconButton } from 'src/components/common/Button/ArrowBackIconButton'
import { Layout } from 'src/components/layout/layout'
import { SendPasswordReset } from 'src/components/pages/auth/sendPasswordReset/SendPasswordReset'

export default function SendPasswordPage() {
  return <SendPasswordReset />
}

SendPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      headerProps={{
        title: 'パスワードリセット',
        rightComponent: <></>,
        leftComponent: <ArrowBackIconButton />,
      }}
    >
      {page}
    </Layout>
  )
}
