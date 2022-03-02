import { ButtonGroup, Button, VisuallyHidden, Icon } from '@chakra-ui/react'
import React from 'react'
import { BsInstagram, BsTwitter } from 'react-icons/bs'
import { FaTiktok } from 'react-icons/fa'

type Props = {
  urls: string[]
}

const providers = [
  {
    name: 'Twitter',
    icon: <Icon as={BsTwitter} />,
    path: 'https://twitter.com/',
  },
  {
    name: 'Instagram',
    icon: <Icon as={BsInstagram} />,
    path: 'https://www.instagram.com/',
  },
  {
    name: 'Tiktok',
    icon: <Icon as={FaTiktok} />,
    path: 'https://www.tiktok.com/',
  },
]

export const SNSButtonGroup: React.FC<Props> = ({ urls }) => {
  return (
    <ButtonGroup variant='outline' spacing='4' width='full'>
      {providers.map(({ name, icon, path }, i) => (
        <Button
          as='a'
          href={`${path}${urls[i] || ''}`}
          type='button'
          key={name}
          isFullWidth
        >
          <VisuallyHidden>{name} link</VisuallyHidden>
          {icon}
        </Button>
      ))}
    </ButtonGroup>
  )
}
