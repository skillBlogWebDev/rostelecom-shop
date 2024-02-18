import nodemailer from 'nodemailer'

export async function sendMail(subject, toEmail, otpText) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
      pass: process.env.NEXT_PUBLIC_NODEMAILER_PW,
    },
  })

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    text: otpText,
  }

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}
