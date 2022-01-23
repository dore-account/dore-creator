import { Flex, HStack, Box, Center, Heading } from '@chakra-ui/react';
import React from 'react';

export type HeaderProps = {
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return <Flex w="full" shadow="sm" position="sticky">
  <HStack flex="1" h="full" px="4">
    <Box w="0" position="relative">
      <Center left="0" h="full" position="absolute" />
    </Box>
    <Center h="14" w={{ base: 'full', md: 'unset' }}>
      <Heading size="md">{title}</Heading>
    </Center>
    <Box w="0" position="relative">
      <Center right="0" h="full" position="absolute" />
    </Box>
  </HStack>
</Flex>;
};
