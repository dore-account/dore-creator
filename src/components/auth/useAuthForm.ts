import { useRouter } from 'next/router'
import { useContext } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useAuthContext } from 'src/hooks/auth/useAuthState'
import { AuthFormContext } from './AuthForm'

export const useAuthFormContext = () => useContext(AuthFormContext)

export const useAuthForm = () => {
  const {
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
  } = useForm({ mode: 'all' })
  const { signInWithEmail, signUpWithEmail, passwordReset } = useAuthContext()
  const router = useRouter()

  const signIn: SubmitHandler<FieldValues> = async (data) => {
    const success = await signInWithEmail(data.email, data.password)
    if (success) router.push('/')
  }

  const signUp: SubmitHandler<FieldValues> = async (data) => {
    const success = await signUpWithEmail(data.email, data.password)
    if (success) router.push('/profile/register')
  }

  const sendPasswordReset: SubmitHandler<FieldValues> = async (data) => {
    const success = await passwordReset(data.email)
    if (success) router.back()
  }

  return {
    register,
    errors,
    isSubmitting,
    isValid,
    handleSubmit,
    signIn,
    signUp,
    sendPasswordReset,
  }
}
