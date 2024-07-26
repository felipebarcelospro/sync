import { APP_CONFIGS } from '@/boilerplate.config'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import Footer from './components/footer'

export default function DowngradeEmail({
  name = 'Brendon Urie',
  email = 'panic@thedis.co',
  previousPlan = 'Pro',
  newPlan = 'Basic',
  team = 'Acme Inc.',
}: {
  name: string | null
  email: string
  previousPlan: string
  newPlan: string
  team: string
}) {
  return (
    <Html>
      <Head />
      <Preview>
        Important update about your {APP_CONFIGS.app.name} plan.
      </Preview>
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
              Update on Your {APP_CONFIGS.app.name} {previousPlan} Plan
            </Heading>
            <Text className="text-sm leading-6 text-black">
              Hello{name && ` ${name}`}!
            </Text>
            <Text className="text-sm leading-6 text-black">
              I'm {APP_CONFIGS.app.creator.name}, founder of{' '}
              {APP_CONFIGS.app.name}. I noticed that your {team}'s plan has been
              changed from {previousPlan} to {newPlan}. We want to ensure this
              transition is smooth and that you continue to get the most value
              from our services.
            </Text>
            <Text className="text-sm leading-6 text-black">
              If you have any concerns or questions about this change, please
              don't hesitate to reach out. We're here to support you every step
              of the way.
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
