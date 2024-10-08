import type { NodemailerConfig } from '@auth/core/providers/nodemailer'
import type { Theme } from '@auth/core/types'
import { MagicLink } from '@buildberry/cranberry'
import { render } from '@react-email/components'
import { createTransport } from 'nodemailer'

interface Params {
  identifier: string
  url: string
  expires: Date
  provider: NodemailerConfig
  token: string
  theme: Theme
  request: Request
}

export async function sendVerificationRequest(params: Params) {
  const { identifier, url, provider, theme } = params
  const { host } = new URL(url)
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(provider.server)
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: 'Your Magic Link to Build Berry Awaits! 🚀✨',
    text: text({ url, host }),
    html: await html(params),
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
  }
}

async function html(params: Params) {
  const { url } = params
  const emailHtml = await render(
    MagicLink({
      userFirstname: '[Developer Extraordinaire]',
      magicLink: url,
    }),
  )

  return emailHtml
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}
