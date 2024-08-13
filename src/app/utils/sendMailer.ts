import nodemailer from 'nodemailer'
import config from '../config'
export const sendEmail = async (to:string,html:string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'nazmulhasanshadin000@gmail.com',
      pass: 'obuc sydw jqkc mvgm',
    },
  })

  await transporter.sendMail({
    from: 'nazmulhasanshadin000@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password ✔', // Subject line
    text: 'whats up ! Reset your password to save your life?', // plain text body
    html, // html body
  })
}
