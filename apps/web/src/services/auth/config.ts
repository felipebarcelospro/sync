import EmailProvider from 'next-auth/providers/email'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import LoginLink from '@/emails/login-link'
import WelcomeEmail from '@/emails/welcome-email'

import { APP_CONFIGS } from '@/boilerplate.config'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { renderAsync } from '@react-email/components'
import { NextAuthOptions } from 'next-auth'
import { db } from '../db'
import { modules } from '@app/modules/src'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth',
    verifyRequest: '/auth',
    error: '/auth',
    newUser: '/app/get-started',
    signOut: '/auth',
  },
  providers: [
    Google({
      clientId: APP_CONFIGS.providers.auth.providers.google.clientId,
      clientSecret: APP_CONFIGS.providers.auth.providers.google.clientSecret,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: APP_CONFIGS.providers.auth.providers.github.clientId,
      clientSecret: APP_CONFIGS.providers.auth.providers.github.clientSecret,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      from: APP_CONFIGS.providers.mail.resend.from,
      sendVerificationRequest: async ({ identifier, url }) => {
        await modules.provider.mail.send({
          from: APP_CONFIGS.providers.mail.resend.from,
          to: identifier,
          subject: `Your ${APP_CONFIGS.app.name} Login Link`,
          body: await renderAsync(
            LoginLink({
              email: identifier,
              url,
            }),
          ),
        })
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = await modules.usecases.user.getUserById.execute(user.id)
      return session
    },
  },
  events: {
    async createUser(message) {
      await modules.provider.mail.send({
        from: APP_CONFIGS.providers.mail.resend.from,
        to: message.user.email,
        subject: `Welcome to ${APP_CONFIGS.app.name}`,
        body: await renderAsync(
          WelcomeEmail({
            email: message.user.email,
            name: message.user.name,
          }),
        ),
      })
    },
  },
}
