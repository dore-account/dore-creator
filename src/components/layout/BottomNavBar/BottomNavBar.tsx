import React from 'react'
import { Flex, Text, Box, Center, Stack, Icon } from '@chakra-ui/react'
import {
  MdOutlineSwipe,
  MdSearch,
  MdOutlineAccountCircle,
} from 'react-icons/md'
import { AiOutlineMessage } from 'react-icons/ai'
import { useRouter } from 'next/router'

const BOTTOM_NAVIGATION_ICONS = [
  MdOutlineSwipe,
  MdSearch,
  AiOutlineMessage,
  MdOutlineAccountCircle,
]

const BOTTOM_NAVIGATION_PATHS = [
  '/',
  '/search',
  '/products',
  '/mypage'
]

export const BottomNavBar = () => {
  const [value, setValue] = React.useState(0)
  const router = useRouter()

  const onSelected = (v: number) => {
    const path = BOTTOM_NAVIGATION_PATHS[v]
    setValue(v)
    router.push(path)
  }

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
      {BOTTOM_NAVIGATION_ICONS.map((icon, i) => (
        <Box key={i} as='button' px={4} onClick={() => onSelected(i)}>
          <Center h='full'>
            <Icon
              w={value === i ? '2em' : '1.5em'}
              h={value === i ? '2em' : '1.5em'}
              as={icon}
              color={value === i ? 'blue.400' : 'gray'}
            />
          </Center>
        </Box>
      ))}
    </Flex>
  )
}
