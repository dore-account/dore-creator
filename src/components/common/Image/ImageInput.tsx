import { AddIcon } from '@chakra-ui/icons'
import {
  Center,
  FormLabel,
  ImageProps,
  Input,
  Skeleton,
  Image,
} from '@chakra-ui/react'
import React, { ChangeEventHandler, useState } from 'react'

type Props = {
  id: string
  onChangeImage: ChangeEventHandler<HTMLInputElement>
}

export const ImageInput: React.FC<Props & ImageProps> = ({
  onChangeImage,
  id,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(!props.src)

  const onLoad = () => {
    setIsLoaded(true)
  }

  return (
    <Center>
      <FormLabel htmlFor={id} cursor="pointer" m="0">
        <Skeleton isLoaded={isLoaded} width="fit-content">
          <Image
            alt={props.alt}
            onLoad={onLoad}
            onError={onLoad}
            objectFit="cover"
            fallback={
              <Center w={24} h={24} bg="gray.100">
                <AddIcon size="30" />
              </Center>
            }
            {...props}
          />
        </Skeleton>
        <Input
          id={id}
          type="file"
          display="none"
          accept="image/*"
          onChange={onChangeImage}
        />
      </FormLabel>
    </Center>
  )
}
