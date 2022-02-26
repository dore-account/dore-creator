import { VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactElement } from 'react'
import { AuthButton } from 'src/components/auth/button/authButton'
import { Layout } from 'src/components/layout/layout'

function Home() {
  return (
    <VStack>
      <Link href='/profile'>
        <a>profile</a>
      </Link>
    </VStack>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      headerProps={{
        title: 'home',
        rightComponent: <AuthButton />,
        leftComponent: <></>,
      }}
    >
      {page}
    </Layout>
  )
}

export default Home
