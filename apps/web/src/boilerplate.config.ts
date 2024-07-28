export const APP_CONFIGS = {
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http//localhost:3000',
    name: 'Sync',
    theme: 'light',
    defaultLanguage: 'pt',
    description: 'Transform Your Project into a Successful Micro-SaaS',
    ogImage: 'https://cdn.nubler.com.br/saas-boilerplate/og-image.png',
    brand: {
      logos: {
        icon: {
          dark: 'https://cdn.indier.com.br/indier/logo-icon-dark.svg',
          light: 'https://cdn.indier.com.br/indier/logo-icon-light.svg',
        },
        full: {
          dark: 'https://cdn.indier.com.br/indier/logo-dark.svg',
          light: 'https://cdn.indier.com.br/indier/logo-light.svg',
        },
      },
    },
    creator: {
      name: 'Felipe Barcelos',
      image:
        'https://pbs.twimg.com/profile_images/1745449170293702657/3lqSo1oy_400x400.png',
      twitter: 'https://twitter.com/feldbarcelospro',
    },
    links: {
      site: 'https://saas.co/',
      support: 'https://saas.co/support',
      terms: 'https://saas.co/terms',
      privacy: 'https://saas.co/privacy',
      docs: 'https://docs.saas.co',
      changelog: '/changelog',
      blog: '/blog',
      linkedin: 'https://www.linkedin.com/in/felipebarcelospro/',
      twitter: 'https://twitter.com/feldbarcelospro',
    },
  },
  providers: {
    billing: {
      keys: {
        publishable: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        key: process.env.STRIPE_SECRET_KEY,
        webhook: process.env.STRIPE_WEBHOOK_SECRET,
      },
      meta: {
        TEAM_MEMBERS: {
          name: 'Seats',
          table: 'Membership',
          label: '{{ value }} seats',
        },
        INTEGRATIONS: {
          name: 'Integrations',
          table: undefined,
          label: 'Third-party integrations',
        },
        EMAIL_SUPPORT: {
          name: 'Email support',
          table: undefined,
          label: 'Email support',
        },
        PRIORITY_SUPPORT: {
          name: 'Priority Support',
          table: undefined,
          label: 'Priority Support',
        },
      },
    },
    cloud: {
      easypanel: {
        token: process.env.EASYPANEL_TOKEN,
      },
    },
    mail: {
      resend: {
        from: 'SaaS Boilerplate <no-reply@zilix.com.br>',
        token: process.env.RESEND_API_KEY,
      },
    },
    ai: {
      openai: {
        token: process.env.OPENAI_API_KEY,
      },
    },
    images: {
      unsplash: {
        accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
      },
    },
    analytics: {
      GTM: process.env.NEXT_PUBLIC_GTM,
      notifylog: process.env.NOTIFYLOG_TOKEN,
    },
    jobs: {
      nextcron: process.env.NEXTCRON_TOKEN,
    },
    auth: {
      providers: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
      },
    },
    storage: {
      endpoint: process.env.STORAGE_ENDPOINT,
      region: process.env.STORAGE_REGION,
      bucket: process.env.STORAGE_BUCKET,
      path: process.env.STORAGE_PATH,
      accessKeyId: process.env.STORAGE_ACCESS_KEY_ID,
      secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY,
      signatureVersion: 'v4',
    },
  },
}
