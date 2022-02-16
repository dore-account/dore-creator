import { useState, ChangeEventHandler, useEffect, createContext } from 'react'
import { useForm } from 'react-hook-form'
import {
  useUploadUserImageMutation,
  useDeleteUserImageMutation,
  User,
} from 'src/libs/graphql/graphql'

export const useEditForm = (initialUser: User) => {
  const [user, setUser] = useState<User>(initialUser)
  // const [updateImage, { data, loading, error }] = useUploadUserImageMutation()
  const [updateImage] = useUploadUserImageMutation()
  const [deleteImage] = useDeleteUserImageMutation()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
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

  return {
    user,
    register,
    errors,
    isSubmitting,
    handleSubmit,
    handleImageInputChange,
    handleImageDelete,
  }
}
