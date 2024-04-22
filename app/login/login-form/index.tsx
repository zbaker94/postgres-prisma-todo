"use client";
import { useMemo } from 'react'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from '@/lib/zod';
import { login } from '../actions';
import LoginFormDisplay from './login-form.display';


export const dynamic = 'force-dynamic'

type loginData = typeof loginSchema._type

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState,
        setError,
      } = useForm<loginData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          username: "",
          password: ""
        },
        mode: "all"
      })
    
      console.log(formState)
    
      const onSubmit = handleSubmit(async (data) => {
        try {
          const user = await login(data)
          console.log(user)
        } catch (error) {
          const {message} = error as {message: string}
          setError("root", {message})
        }
      
      })
    
      const canSubmitFlag = useMemo(() => formState.isValid && !formState.isSubmitting, [formState.isSubmitting, formState.isValid])

      return (
            <LoginFormDisplay onSubmit={onSubmit} formState={formState} register={register} canSubmitFlag={canSubmitFlag} />
      )
}

export default LoginForm;