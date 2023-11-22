import sendGrid from '@sendgrid/mail'

const { SENDGRID_API_KEY, FROM_EMAIL_ADDRESS } = process.env

sendGrid.setApiKey(SENDGRID_API_KEY || '')

async function sendEmail(userEmail: string, username: string, activationLink: string) {
  const email = {
    to: userEmail,
    from: FROM_EMAIL_ADDRESS || '',
    subject: 'Activate your new account',
    text: `Hi, please ${username} activate your account using this link: ${activationLink}`,
    html: ` <b>Hi, please ${username} activate your account using this link: </b> <a href="${activationLink}">Activate Account</a>`
  }

  return sendGrid.send(email)
}

export { sendEmail }
