import { Box, Container, Icon, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { MdBarChart, MdEdit, MdSettings } from 'react-icons/md'
import { RoundIconButton } from 'src/components/common/Button/RoundIconButton'
import { RoundImage } from 'src/components/common/Image/RoundImage'
import { Loader } from 'src/components/common/loader'
import { useCurrentUserQuery, UserQuery } from 'src/libs/graphql/graphql'

export const Account: React.FC = () => {
  const router = useRouter()
  const { data } = useCurrentUserQuery()

  if (!data) return <Loader />
  const user = data.user
  const imagePath = user.images.length >= 1 ? user.images.shift()?.path : ''

  return (
    <Container maxW='7xl' h='full' py={8}>
      <Stack spacing={6}>
        <RoundImage src={imagePath} />
        <Box align='center'>
          <Text fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
            {user.name}
          </Text>

          <Text color={'gray.500'}>{`@${user.slug}`}</Text>
        </Box>

        <Stack direction='row' align={'center'} justify='space-around'>
          <Box textAlign='center' w='full'>
            <RoundIconButton
              icon={<Icon as={MdSettings} w='2em' h='2em' />}
              onClick={() => console.log('tap')}
            />
            <Text pt={3} pb={9} fontSize='md' fontWeight={400}>
              設定
            </Text>
          </Box>
          <Box textAlign='center' w='full'>
            <RoundIconButton
              icon={<Icon as={MdEdit} w='2em' h='2em' />}
              onClick={() => router.push('/profile/edit')}
            />
            <Text pt={3} fontSize='lg' fontWeight={400}>
              編集
            </Text>
          </Box>
          <Box textAlign='center' w='full'>
            <RoundIconButton
              icon={<Icon as={MdBarChart} w='2em' h='2em' />}
              onClick={() => console.log('tap')}
            />
            <Text pt={3} pb={9} fontSize='md' fontWeight={400}>
              ランキング
            </Text>
          </Box>
        </Stack>
      </Stack>
    </Container>
  )
}
