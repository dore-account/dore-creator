import { useState, ChangeEventHandler, useEffect, createContext } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import {
  useUploadUserImageMutation,
  useDeleteUserImageMutation,
  User,
} from 'src/libs/graphql/graphql'

export const useEditForm = (initialUser: User) => {
  const [user, setUser] = useState<User>(initialUser)
  const [updateImage] = useUploadUserImageMutation()
  const [deleteImage] = useDeleteUserImageMutation()
  const {
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    control,
  } = useForm({
    mode: 'all',
  })

  const handleImageInputChange: ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (!e.target.files) return

    const image = e.target.files.item(0)
    if (!image) return

    await updateImage({ variables: { input: { image: image } } }).then((d) => {
      const data = d.data?.uploadUserImage?.user

      if (data) setUser(data)
    })
  }

  const handleImageDelete = (imageId: string) => async () => {
    if (imageId === '') return

    await deleteImage({ variables: { input: { id: imageId } } }).then((d) => {
      const data = d.data?.deleteUserImage?.user

      if (data) setUser(data)
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
    console.log(JSON.stringify(data))
  }

  return {
    user,
    register,
    errors,
    control,
    isSubmitting,
    isValid,
    handleSubmit: handleSubmit(onSubmit),
    handleImageInputChange,
    handleImageDelete,
  }
}
