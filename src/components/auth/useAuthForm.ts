import { useContext } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AuthFormContext } from './AuthForm'

export const useAuthFormContext = () => useContext(AuthFormContext)

export const useAuthForm = () => {
  const {
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
  } = useForm({ mode: 'all' })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return {
    register,
    errors,
    isSubmitting,
    isValid,
    handleSubmit: handleSubmit(onSubmit),
  }
}
