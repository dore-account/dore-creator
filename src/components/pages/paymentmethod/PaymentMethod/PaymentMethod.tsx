import { AddIcon } from '@chakra-ui/icons'
import { Button, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { CreditCard } from 'src/components/stripe/CreditCard/CreditCard'
import { PaymentMethodsQuery } from 'src/libs/graphql/graphql'

type Props = {
  data: PaymentMethodsQuery
}
export const PaymentMethod: React.FC<Props> = ({ data }) => {
  const router = useRouter()
  
  return (
    <VStack p={5} spacing={5}>
      {data.paymentMethods.map((pm) => (
        <CreditCard
          key={pm.id}
          brand={pm.brand}
          date={`${pm.expMonth}/${pm.expYear}`}
        />
      ))}
      <Button onClick={() => router.push('/paymentmethod/new')} leftIcon={<AddIcon />} colorScheme='blue' variant='outline'>
        追加
      </Button>
    </VStack>
  )
}
