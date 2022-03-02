import { Box, Center, Icon } from '@chakra-ui/react'
import React, { MouseEventHandler } from 'react'

type Props = {
  icon: JSX.Element
  onClick: (MouseEventHandler<HTMLDivElement> & MouseEventHandler<HTMLButtonElement>)
}

export const RoundIconButton: React.FC<Props> = ({icon, onClick}) => {
  return (
    <Box
      as='button'
      onClick={onClick}
      boxShadow='dark-lg'
      p={5}
      bg='white'
      rounded="full"
    >
      <Center>
        {icon}
      </Center>
    </Box>
  )
}
