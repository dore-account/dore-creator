import React from 'react'
import { Flex, Box, Center, Icon } from '@chakra-ui/react'
import {
  MdOutlineSwipe,
  MdSearch,
  MdOutlineAccountCircle,
} from 'react-icons/md'
import { AiOutlineMessage } from 'react-icons/ai'
import { useRouter } from 'next/router'

const BOTTOM_NAVIGATION_ICONS = [
  { icon: MdOutlineSwipe, path: '/' },
  { icon: MdSearch, path: '/search' },
  { icon: AiOutlineMessage, path: '/products' },
  { icon: MdOutlineAccountCircle, path: '/mypage' },
]

export const BottomNavBar = () => {
  const router = useRouter()

  return (
    <Flex
      w='full'
      borderTop='1px'
      borderTopColor='gray.100'
      shadow='sm'
      px='4'
      h='16'
      bottom={0}
      left={0}
      right={0}
      position='fixed'
      justifyContent='space-around'
    >
      {BOTTOM_NAVIGATION_ICONS.map(({ icon, path }, i) => (
        <Box key={i} as='button' px={4} onClick={() => router.push(path)}>
          <Center h='full'>
            <Icon
              w={router.pathname === path ? '2em' : '1.5em'}
              h={router.pathname === path ? '2em' : '1.5em'}
              as={icon}
              color={router.pathname === path ? 'blue.400' : 'gray'}
            />
          </Center>
        </Box>
      ))}
    </Flex>
  )
}
