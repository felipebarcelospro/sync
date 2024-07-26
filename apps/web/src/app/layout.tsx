import NextTopLoader from 'nextjs-toploader'

import { APP_CONFIGS } from '@/boilerplate.config'
import { ThemeProvider } from '@design-system/react/components/ui/theme-provider'
import { Toaster } from '@design-system/react/components/ui/toaster'
import { UTMProvider } from '@design-system/react/components/ui/utm-provider'
import { GoogleTagManager } from '@next/third-parties/google'
import { GeistSans } from 'geist/font/sans'
import { Suspense } from 'react'
import { LocaleProvider } from '@/services/internationalization/contexts/locale.context'
import { getLocaleFromRequest } from '@/services/internationalization/helpers/get-locale-from-request'

import '@design-system/react/style.scss'

export const metadata = {
  title: {
    template: `%s · ${APP_CONFIGS.app.name}`,
    default: 'Page',
  },
  openGraph: {
    images: [APP_CONFIGS.app.ogImage],
  },
  metadataBase: new URL(APP_CONFIGS.app.url),
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = getLocaleFromRequest()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${GeistSans.className} font-sans`}>
        <NextTopLoader color="#e11d48" />
        <Toaster />
        <GoogleTagManager gtmId={APP_CONFIGS.providers.analytics.GTM} />

        <ThemeProvider
          attribute="class"
          defaultTheme={APP_CONFIGS.app.theme}
          enableSystem
          disableTransitionOnChange
          value={{
            light: 'light-theme',
            dark: 'dark-theme',
          }}
        >
          <Suspense>
            <LocaleProvider locale={locale}>
              <UTMProvider />
              {children}
            </LocaleProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
