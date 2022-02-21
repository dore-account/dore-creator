import { Flex, HStack, Box, Center, Heading } from '@chakra-ui/react'
import React from 'react'

export type HeaderProps = {
  title: string
  rightComponent: any
  leftComponent: any
}

export const Header: React.FC<HeaderProps> = ({
  title,
  rightComponent,
  leftComponent,
}) => {
  return (
    <Flex
      w="full"
      shadow="sm"
      px="4"
      top={0}
      position="sticky"
      zIndex={'sticky'}
      justifyContent="space-between"
    >
      <Box w="0" position="relative">
        <Center left="0" h="full" position="absolute">
          {leftComponent}
        </Center>
      </Box>
      <Center h="14" w={{ base: 'full', md: 'unset' }}>
        <Heading size="md">{title}</Heading>
      </Center>
      <Box w="0" position="relative">
        <Center right="0" h="full" position="absolute">
          {rightComponent}
        </Center>
      </Box>
    </Flex>
  )
}
