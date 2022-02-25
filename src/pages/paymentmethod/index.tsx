import { Center } from '@chakra-ui/react'
import { Loader } from 'src/components/common/loader'
import { PaymentMethod } from 'src/components/pages/paymentmethod/PaymentMethod/PaymentMethod'
import { usePaymentMethodsQuery } from 'src/libs/graphql/graphql'

export default function PaymentMethodPage() {
  const { data, loading } = usePaymentMethodsQuery()

  if (loading) return <Loader />

  return (
    <>
      {!data ? (
        <Center>登録されているカードはありません。</Center>
      ) : (
        <PaymentMethod data={data} />
      )}
    </>
  )
}
