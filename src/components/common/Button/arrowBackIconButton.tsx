import React from 'react'
import { useRouter } from 'next/router'
import { Icon, IconButton } from '@chakra-ui/react'
import { IoMdArrowRoundBack } from 'react-icons/io'

export const ArrowBackIconButton = () => {
  const router = useRouter()

  return (
    <IconButton
      onClick={() => router.back()}
      aria-label='arrow back'
      icon={<Icon as={IoMdArrowRoundBack} />}
    />
  )
}
