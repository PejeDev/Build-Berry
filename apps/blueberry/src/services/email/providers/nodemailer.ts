import { MagicLink } from '@buildberry/cranberry'
import { render } from '@react-email/components'
import { createTransport } from 'nodemailer'

export const transport = createTransport({
  host: Bun.env.EMAIL_SERVER_HOST,
  port: Number.parseInt(Bun.env.EMAIL_SERVER_PORT ?? '587'),
  auth: {
    user: Bun.env.EMAIL_SERVER_USER,
    pass: Bun.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function sendMagicLinkMail(email: string, url: string) {
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const result = await transport.sendMail({
    to: email,
    from: Bun.env.EMAIL_FROM,
    subject: 'Your Magic Link to Build Berry Awaits! 🚀✨',
    text: text({ url }),
    html: await html(url),
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
  }
}

async function html(url: string) {
  const emailHtml = await render(
    MagicLink({
      userFirstname: '[Developer Extraordinaire]',
      magicLink: url,
    }),
  )

  return emailHtml
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url }: { url: string }) {
  return `Sign in to ${url}`
}
