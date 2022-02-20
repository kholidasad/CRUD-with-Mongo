const nodemailer = require('nodemailer')

exports.sendEmail = async(to, subject, text, html) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    })

    let info = await transporter.sendMail({
        from: process.env.NODEMAILER_USER,
        to,
        subject,
        text,
        html
    })

    console.log('Message sent: %s', info.messageId)

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}