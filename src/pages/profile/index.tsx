import { Center, Heading, Spinner, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { useCreatorsQuery } from 'src/libs/graphql/graphql'

export default function ProfilePage() {
  const { loading, data, error } = useCreatorsQuery()
  const user = data?.creators.map((data) => data.id)

  if (loading) return <Spinner />

  console.log(data)

  return (
    <Center w="full" h="100vh">
      <VStack as="form" direction="column" w="80" p="4" border="md">
        <Heading size="md">{user}</Heading>
        <Link href="/profile/edit">
          <a>edit</a>
        </Link>
      </VStack>
    </Center>
  )
}
