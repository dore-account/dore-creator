import {
  Box,
  HStack,
} from '@chakra-ui/react'
import React from 'react'
import { Loader } from 'src/components/common/loader'
import { usePaymentMethodsQuery } from 'src/libs/graphql/graphql'

export default function PaymentMethod() {
  const { data, loading } = usePaymentMethodsQuery()

  if (loading) return <Loader />

  return (
    <>
      {data?.paymentMethods.map((paymentMethod) => {
        ;<Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <HStack>
            {paymentMethod.brand}
            {paymentMethod.expMonth}
            {paymentMethod.expYear}
            {paymentMethod.last4}
          </HStack>
        </Box>
      })}
    </>
  )
}
