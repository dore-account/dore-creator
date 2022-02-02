import '../styles/globals.css'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'src/hooks/auth/useAuthState'
import { NextPage } from 'next'
import { ReactElement, ReactNode, useEffect } from 'react'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const cache = new InMemoryCache()
const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  cache,
})

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <AuthProvider>
          {
            getLayout(<Component {...pageProps} />)
          }
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}
