import { VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactElement } from 'react'
import { AuthButton } from 'src/components/auth/button/authButton'
import { MainLayout } from 'src/components/layout/MainLayout'

function Home() {
  return (
    <VStack>
      <Link href='/profile'>
        <a>profile</a>
      </Link>
      <Link href='/paymentmethod'>
        <a>paymentmethod</a>
      </Link>
    </VStack>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      headerProps={{
        title: 'home',
        rightComponent: <AuthButton />,
        leftComponent: <></>,
      }}
    >
      {page}
    </MainLayout>
  )
}

export default Home
