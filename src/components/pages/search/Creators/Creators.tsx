import { Container, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { Loader } from 'src/components/common/loader'
import { ProfileCard } from 'src/components/profile/ProfileCard/ProfileCard'
import { useCreatorsQuery } from 'src/libs/graphql/graphql'

export const Creators: React.FC = () => {
  const { data, loading } = useCreatorsQuery()

  if (loading) return <Loader />

  return (
    <Container maxW='7xl' h='full'>
      <SimpleGrid
        columns={{ base: 2, lg: 4 }}
        spacing={{ base: 4, lg: 8 }}
        py={2}
      >
        {data?.creators.map((creator) => (
          <ProfileCard
            key={creator.id}
            imageURL={`${process.env.NEXT_PUBLIC_BACKEND_URL}${creator.user.images[0].path}`}
            name={creator.user.name}
            category={creator.categories[0].name}
          />
        ))}
      </SimpleGrid>
    </Container>
  )
}
