import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'
import type { MagicLinkEmailProps } from '../../definitions/types'

export const MagicLink = ({
  userFirstname,
  magicLink,
}: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>
      "Skip the passwords, embrace the magic. Your CI/CD pipeline is just one
      click away (and no, your cat didn’t request this… we hope)."
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading as="h1">🍓BuildBerry</Heading>
        <Text style={paragraph}>Hey there {userFirstname} 👋,</Text>
        <Text style={paragraph}>
          We know you're busy conquering the code world, so we won’t keep you
          long. Your CI/CD pipeline awaits, but first, let’s skip the password
          drama. Below is your Magic Link – just click it, and you'll be logged
          in faster than you can say "debug mode." 💻⚡️
        </Text>
        <Text style={paragraph}>
          <Link style={link} href={magicLink}>
            👉 Click here to enter the magic realm 🪄
          </Link>
        </Text>

        <Text style={paragraph}>
          No passwords, no fuss. See you on the other side where builds break
          and code gets shipped! 🍓💥
        </Text>
        <Text style={paragraph}>
          Happy coding,
          <br />
          The BuildBerry Team.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          If you didn’t request this email, it’s possible your cat is secretly a
          developer. 🐾 Either way, feel free to ignore it, and we’ll assume the
          cat is taking over your keyboard again. 😼
          <br />
          Still stuck? Try turning it off and on again, or sacrifice a coffee to
          the code gods ☕️. We're always here to help (or at least laugh with
          you).
        </Text>
      </Container>
    </Body>
  </Html>
)

MagicLink.PreviewProps = {
  userFirstname: 'Juan Castaneda',
  magicLink: 'https://buildberry.com/magic-link',
} as MagicLinkEmailProps

export default MagicLink

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}

const link = {
  color: '#FF6363',
}
