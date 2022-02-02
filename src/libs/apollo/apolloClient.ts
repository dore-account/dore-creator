import { ApolloClient,  createHttpLink,  InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import { useMemo } from "react";

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient(initialState: NormalizedCacheObject) {
  const httpLink = createHttpLink({
    uri: "http://localhost:3000",
    credentials: "same-origin"
  });

  const authLink = setContext((_, { headers }) => {
    const token = headers.authorization || ''; 
    console.log(token);
    
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    connectToDevTools: process.browser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState: NormalizedCacheObject) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createApolloClient(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}

// クライアントが使うApolloClient
export function useApollo(initialState: NormalizedCacheObject) {
  const store = useMemo(() => initApollo(initialState), [initialState]);
  return store;
}