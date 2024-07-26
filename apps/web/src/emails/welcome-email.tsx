import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import { APP_CONFIGS } from '../boilerplate.config'
import { getUrl } from '../helpers/get-url'
import Footer from './components/footer'

export default function WelcomeEmail({
  name = 'Brendon Urie',
  email = 'panic@thedis.co',
}: {
  name: string | null
  email: string
}) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {APP_CONFIGS.app.name}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded-md border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={APP_CONFIGS.app.logo}
                width="40"
                height="40"
                alt={APP_CONFIGS.app.name}
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              Welcome to {APP_CONFIGS.app.name}
            </Heading>
            <Section className="my-8">
              <Img
                src={APP_CONFIGS.app.ogImage}
                alt={APP_CONFIGS.app.name}
                className="max-w-[500px]"
              />
            </Section>
            <Text className="text-sm leading-6 text-black">
              Thanks for signing up{name && `, ${name}`}!
            </Text>
            <Text className="text-sm leading-6 text-black">
              My name is {APP_CONFIGS.app.creator.name}, and I`m the founder of{' '}
              {APP_CONFIGS.app.name} - {APP_CONFIGS.app.description}. I`m
              excited to have you on board!
            </Text>
            <Text className="text-sm leading-6 text-black">
              Here are a few things you can do:
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              ◆ See your{' '}
              <Link
                href={getUrl('/app/')}
                className="font-medium text-blue-600 no-underline"
              >
                dashboard
              </Link>
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              ◆{' '}
              <Link
                href={getUrl('/app/settings/members')}
                className="font-medium text-blue-600 no-underline"
              >
                Invite a member
              </Link>{' '}
              to your team
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              ◆ Follow us on{' '}
              <Link
                href={APP_CONFIGS.app.links.twitter}
                className="font-medium text-blue-600 no-underline"
              >
                Twitter
              </Link>
            </Text>
            <Text className="text-sm leading-6 text-black">
              Let me know if you have any questions or feedback. I'm always
              happy to help!
            </Text>
            <Text className="text-sm font-light leading-6 text-gray-400">
              {APP_CONFIGS.app.creator.name} from {APP_CONFIGS.app.name}
            </Text>

            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
