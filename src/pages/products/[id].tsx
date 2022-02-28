import { Box, VStack } from '@chakra-ui/react'
import {
  GetServerSidePropsContext,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import React from 'react'
import { Product } from 'src/components/pages/product/Product/Product'
import initApollo from 'src/libs/apollo/apolloClient'
import {
  ProductDocument,
  ProductQuery,
  ProductQueryVariables,
  ProductsIdDocument,
  ProductsIdQuery,
} from 'src/libs/graphql/graphql'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function ProductPage({ data }: Props) {
  return (
    <Product productData={data} />
  )
}

// この関数はビルド時に呼び出されます。
export const getStaticPaths = async (ctx: GetServerSidePropsContext) => {
  const client = initApollo(null, ctx)
  const { data } = await client.query<ProductsIdQuery>({
    query: ProductsIdDocument,
  })

  // 記事に基づいてプリレンダリングしたいパスを取得します
  const paths = data?.products.map((product) => ({
    params: { id: product.id },
  }))

  // ビルド時にこれらのパスだけをプリレンダリングします。
  // { fallback: false } は他のルートが404になることを意味します。
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<{
  data: ProductQuery
}> = async (ctx) => {
  const client = initApollo(null)
  const id = ctx.params?.id as string

  if (!id) {
    throw new Error('Parameter is invalid')
  }

  try {
    const { data } = await client.query<ProductQuery, ProductQueryVariables>({
      query: ProductDocument,
      variables: { input: id },
    })
    return { props: { data } }
  } catch (err) {
    return { notFound: true }
  }
}
