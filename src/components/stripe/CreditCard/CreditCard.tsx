import React from 'react'
import {
  Box,
  Flex,
  Icon,
  Stat,
  StatHelpText,
  StatLabel,
} from '@chakra-ui/react'
import { BsCreditCard } from 'react-icons/bs'

type Props = {
  brand: string
  date: string
}

export const CreditCard: React.FC<Props> = ({brand, date}) => {
  return (
    <Stat
          w={{ base: 'full', md: '64' }}
          px={{ base: 2, md: 4 }}
          py='5'
          shadow='xl'
          border='1px solid'
          borderColor='gray.500'
          rounded='lg'
        >
          <Flex justifyContent={'space-between'}>
            <Box pl={{ base: 2, md: 4 }}>
              <StatLabel fontSize='lg' fontWeight='medium' isTruncated>
                {brand}
              </StatLabel>
              <StatHelpText fontSize='md' fontWeight='medium'>
                {date}
              </StatHelpText>
            </Box>
            <Box my='auto' color='gray.800' alignContent='center'>
              <Icon w='3em' h='3em' as={BsCreditCard} />
            </Box>
          </Flex>
        </Stat>
  )
}
