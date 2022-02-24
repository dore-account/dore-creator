import { Button } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'

type Props = {
  path: string
  pathName: string
}

export const ActionRouterTextButton: React.FC<Props> = ({ path, pathName }) => {
  const router = useRouter()

  return (
    <>
      <Button onClick={() => router.push(path)} variant='link'>
        {pathName}
      </Button>
    </>
  )
}
