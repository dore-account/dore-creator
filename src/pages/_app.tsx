import '../styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'src/hooks/auth/useAuthState'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { useApollo } from 'src/libs/apollo/apolloClient'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const client = useApollo(pageProps)

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}
