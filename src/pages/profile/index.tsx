import { Center, Heading, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'
import { useUsersQuery } from 'src/libs/graphql/graphql';

export default function ProfilePage() {
  const { loading, data, error } = useUsersQuery()
  const user = data?.getUsers.map((data) => data.id);

  if (loading) return <Spinner />

  return (
    <Center w="full" h="100vh">
      <VStack as="form" direction="column" w="80" p="4" border="md">
        <Heading size="md">{user}</Heading>
      </VStack>
    </Center>
  )
}
