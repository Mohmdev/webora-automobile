import { Container, Heading, Section, Text } from '@react-email/components'
import EmailLayout from './layout'
const PropDefaults = {
  code: 123456,
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_APP_URL

const ChallengeEmail = ({ data = PropDefaults }) => {
  return (
    <EmailLayout
      preview={`Sign in to your account by entering ${data.code} in the sign-in form`}
    >
      <Container className="py-4">
        <Section className="mb-4 flex max-w-lg flex-col items-center">
          <Heading className="mt-0 text-center font-semibold text-3xl">
            Sign in to {baseUrl}
          </Heading>
        </Section>
        <Section className="flex items-center justify-center rounded bg-gray-200 p-6">
          <div className="text-center">
            <Text className="m-0 font-bold">Verification Code</Text>
            <Text className="mx-0 my-2.5 font-bold text-3xl tracking-widest">
              {data.code}
            </Text>
            <Text className="m-0">(This code is valid for 10 minutes)</Text>
          </div>
        </Section>
        <Section>
          <Text className="text-center text-lg text-secondary">
            If you did not request this email you can safely ignore it
          </Text>
        </Section>
      </Container>
    </EmailLayout>
  )
}

export default ChallengeEmail
