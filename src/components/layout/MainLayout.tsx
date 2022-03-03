import { Flex } from '@chakra-ui/react'
import React from 'react'
import { BottomNavBar } from './BottomNavBar/BottomNavBar'
import { Header, HeaderProps } from './header'

export const MainLayout: React.FC<{ headerProps: HeaderProps }> = ({
  children,
  headerProps,
}) => {
  return (
    <Flex direction='column' position='relative' top={0} h='100vh' minH='100vh'>
      <Header {...headerProps} />
      {children}
      <BottomNavBar />
    </Flex>
  )
}
