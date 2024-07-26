'use client'

import React from 'react'

import { Button, ButtonIcon } from '@design-system/react/components/ui/button'
import { SeparatorWithText } from '@design-system/react/components/ui/separator-with-text'
import { toast } from '@design-system/react/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { GoogleIcon } from './google-icon'
import { Input } from '@design-system/react/components/ui/input'
import { APP_CONFIGS } from '@/boilerplate.config'
import { sendGTMEvent } from '@next/third-parties/google'
import { Logo } from '@/app/_components/logo'
import { GithubIcon } from 'lucide-react'

const authFormSchema = z.object({
  email: z.string().email(),
})

type AuthFormSchema = z.infer<typeof authFormSchema>

export function AuthForm() {
  const form = useForm({
    resolver: zodResolver(authFormSchema),
  })

  const [isLoading, setIsLoading] = React.useState({
    google: false,
    github: false,
    email: false,
  })

  async function onSocialLogin(provider: 'google' | 'github') {
    setIsLoading((prev) => ({ ...prev, [provider]: true }))

    try {
      await signIn(provider)

      sendGTMEvent({
        event: 'register',
        value: 'lead',
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading((prev) => ({ ...prev, [provider]: false }))
    }
  }

  const handleSubmit = form.handleSubmit(async (data: AuthFormSchema) => {
    setIsLoading((prev) => ({ ...prev, email: true }))

    try {
      await signIn('email', {
        email: data.email,
        redirect: false,
      })

      sendGTMEvent({
        event: 'register',
        value: 'lead',
      })

      toast({
        title: 'Email sent',
        description: `We have sent an email to ${data.email} with a verification code.`,
      })
    } catch (error) {
      console.log(error)

      toast({
        title: 'Error sending email',
        description: `An error occurred while sending the email to ${data.email}.`,
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, email: false }))
    }
  })

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center mb-8">
        <Logo onlyIcon className="h-12 mb-4" />
      </div>

      <form className="w-full space-y-4 mb-8" onSubmit={handleSubmit}>
        <Input
          variant="outline"
          placeholder="Your email"
          className="h-12"
          {...form.register('email')}
        />

        <Button size="lg" className="w-full h-12 shadow" variant="default">
          <ButtonIcon className="w-4 h-4 mr-3" isLoading={isLoading.email} />
          Continue with email
        </Button>

        <SeparatorWithText>or</SeparatorWithText>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full h-12 shadow"
          onClick={() => onSocialLogin('google')}
        >
          <ButtonIcon
            className="w-4 h-4 mr-3"
            icon={GoogleIcon}
            isLoading={isLoading.google}
          />
          Continue with Google
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full h-12 shadow"
          onClick={() => onSocialLogin('github')}
        >
          <ButtonIcon
            className="w-4 h-4 mr-3"
            icon={GithubIcon}
            isLoading={isLoading.github}
          />
          Continue with GitHub
        </Button>
      </form>

      <span className="text-sm opacity-60 max-w-[80%]">
        By signing up, you agree to our <br />
        terms{' '}
        <a
          href={APP_CONFIGS.app.links.terms}
          target="_blank"
          className="underline"
        >
          <b>Terms of Use</b>
        </a>
      </span>
    </div>
  )
}