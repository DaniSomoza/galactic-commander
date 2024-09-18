import nodemailer from 'nodemailer'

const { EMAIL_USERNAME, EMAIL_PASSWORD } = process.env

async function sendEmail(userEmail: string, username: string, activationLink: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD
    }
  })

  const email = {
    to: userEmail,
    from: EMAIL_USERNAME,
    subject: 'Activate your new account',
    text: `Hi, please ${username} activate your account using this link: ${activationLink}`,
    html: ` <b>Hi, please ${username} activate your account using this link: </b> <a href="${activationLink}">Activate Account</a>`
  }

  return transporter.sendMail(email, (error, info) => {
    if (error) {
      return console.log('Email error: ', error)
    }

    transporter.close()

    console.log('Email sent: ' + info.response)
  })
}

export { sendEmail }
