import {
  useColorModeValue,
  Container,
  Stack,
  Text,
  HStack,
  Icon,
  SimpleGrid,
  Box,
} from '@chakra-ui/react'
import React from 'react'
import { RoundImage } from 'src/components/common/Image/RoundImage'
import {
  CategoryItem,
  CategoryList,
} from 'src/components/profile/button/Category'
import { SNSButtonGroup } from 'src/components/profile/button/SNSButtonGroup'
import {
  MdOutlineBusiness,
  MdOutlineCake,
  MdOutlineTransgender,
  MdOutlineWbSunny,
} from 'react-icons/md'
import { UserQuery } from 'src/libs/graphql/graphql'

type Props = {
  userData: UserQuery
}

export const Profile: React.FC<Props> = ({ userData }) => {
  const user = userData.user
  const imagePath = user.images.length >= 1 ? user.images.shift()?.path : ''

  return (
    <Container maxW='7xl' h='full' py={8}>
      <Stack spacing={6}>
        <RoundImage
          src={
            imagePath
            // 'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080'
          }
        />
        <Box align='center'>
          <Text fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
            {user.name}
          </Text>
          <Text color={'gray.500'}>{`@${user.slug}`}</Text>
          
        </Box>

        <SNSButtonGroup
          urls={[user.twitterLink, user.instagramLink, user.tiktokLink]}
        />
        <Text
          fontSize='lg'
          color={useColorModeValue('gray.700', 'gray.400')}
          px={2}
        >
          {user.introduction}
        </Text>
        <SimpleGrid
          align='center'
          columns={{ base: 1, lg: 4 }}
          spacing={{ base: 2, lg: 4 }}
          fontSize='lg'
        >
          <HStack>
            <Icon as={MdOutlineWbSunny} />
            <Text>{`${user.age}歳`}</Text>
          </HStack>
          <HStack>
            <Icon as={MdOutlineCake} />
            <Text>{`${user.birthDayYy}年${user.birthDayMm}月${user.birthDayDd}日`}</Text>
          </HStack>
          <HStack>
            <Icon as={MdOutlineTransgender} />
            <Text>{user.gender}</Text>
          </HStack>
          <HStack>
            <Icon as={MdOutlineBusiness} />
            <Text>株式会社サイファークリエイション</Text>
          </HStack>
        </SimpleGrid>
      </Stack>
    </Container>
  )
}
