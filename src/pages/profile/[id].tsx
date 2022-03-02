import {
  GetServerSidePropsContext,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import React, { ReactElement } from 'react'
import { ArrowBackIconButton } from 'src/components/common/Button/ArrowBackIconButton'
import { Layout } from 'src/components/layout/layout'
import { Profile } from 'src/components/pages/profile/Profile/Profile'
import initApollo from 'src/libs/apollo/apolloClient'
import {
  UserDocument,
  UserQuery,
  UserQueryVariables,
  UsersIdSlugDocument,
  UsersIdSlugQuery,
} from 'src/libs/graphql/graphql'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function ProfilePage({ data }: Props) {
  return <Profile userData={data} />
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      headerProps={{
        title: 'home',
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
  data: UserQuery
}> = async (ctx) => {
  const client = initApollo(null)
  const id = ctx.params?.id as string
  // const slug = ctx.params?.slug as string

  if (!id) {
    throw new Error('Parameter is invalid')
  }

  try {
    const { data } = await client.query<UserQuery, UserQueryVariables>({
      query: UserDocument,
      variables: { input: id },
    })
    return { props: { data } }
  } catch (err) {
    return { notFound: true }
  }
}
