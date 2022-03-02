import {
  GetServerSidePropsContext,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import React, { ReactElement } from 'react'
import { ArrowBackIconButton } from 'src/components/common/Button/ArrowBackIconButton'
import { Layout } from 'src/components/layout/layout'
import { CreatorProfile } from 'src/components/pages/profile/Profile/CreatorProfile'
import initApollo from 'src/libs/apollo/apolloClient'
import {
  CreatorDocument,
  CreatorQuery,
  CreatorQueryVariables,
  UsersIdSlugDocument,
  UsersIdSlugQuery,
} from 'src/libs/graphql/graphql'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function CreatorProfilePage({ data }: Props) {
  return <CreatorProfile creatorData={data} />
}

CreatorProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      headerProps={{
        title: 'クリエイター',
        rightComponent: <></>,
        leftComponent: <ArrowBackIconButton />,
      }}
    >
      {page}
    </Layout>
  )
}

export const getStaticPaths = async (ctx: GetServerSidePropsContext) => {
  const client = initApollo(null, ctx)
  const { data } = await client.query<UsersIdSlugQuery>({
    query: UsersIdSlugDocument,
  })

  const paths = data?.users.map((user) => ({
    params: { id: user.id, slug: user.slug },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<{
  data: CreatorQuery
}> = async (ctx) => {
  const client = initApollo(null)
  const id = ctx.params?.id as string
  // const slug = ctx.params?.slug as string

  if (!id) {
    throw new Error('Parameter is invalid')
  }

  try {
    const { data } = await client.query<CreatorQuery, CreatorQueryVariables>({
      query: CreatorDocument,
      variables: { input: id },
    })
    return { props: { data } }
  } catch (err) {
    return { notFound: true }
  }
}
