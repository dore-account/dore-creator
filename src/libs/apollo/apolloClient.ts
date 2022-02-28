import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'

import { setContext } from '@apollo/client/link/context'

import { useMemo } from 'react'
import nookies from 'nookies'
import { GetServerSidePropsContext } from 'next'
import { AppProps } from 'next/app'
import { concatPagination } from '@apollo/client/utilities'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject>

function createApolloClient(ctx?: GetServerSidePropsContext) {
  const httpLink = createUploadLink({
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
    link: authLink.concat(httpLink as unknown as ApolloLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  })
}

export default function initApollo(
  initialState: NormalizedCacheObject | undefined | null,
  ctx?: GetServerSidePropsContext
) {
  const _apolloClient = apolloClient ?? createApolloClient(ctx)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps'],
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

// クライアントが使うApolloClient
export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initApollo(state), [state])
  return store
}
