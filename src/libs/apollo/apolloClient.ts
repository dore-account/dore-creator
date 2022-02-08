import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { useMemo } from 'react'
import nookies from 'nookies'
import { GetServerSidePropsContext } from 'next'

let apolloClient: ApolloClient<NormalizedCacheObject>

function createApolloClient(
  initialState: NormalizedCacheObject,
  ctx?: GetServerSidePropsContext
) {
  const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
    credentials: 'include',
  })

  const authLink = setContext((_, { headers }) => {
    // JWT取り出し
    const accessToken = nookies.get(ctx)
    const token = accessToken['ID_TOKEN'] || ''

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    connectToDevTools: process.browser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  })
}

export default function initApollo(
  initialState: NormalizedCacheObject,
  ctx?: GetServerSidePropsContext
) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createApolloClient(initialState, ctx)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState, ctx)
  }

  return apolloClient
}

// クライアントが使うApolloClient
export function useApollo(initialState: NormalizedCacheObject) {
  const store = useMemo(() => initApollo(initialState), [initialState])
  return store
}
