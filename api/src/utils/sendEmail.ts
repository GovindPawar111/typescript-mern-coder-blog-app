import nodemailer from 'nodemailer'
import emailVerificationTemplate from './emailVerificationTemplate'

const sendVerificationEmail = async (email: string, verificationToken: string): Promise<void> => {
    try {
        // Configure the transporter
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        })

        // Define the email options
        const mailOptions = {
            from: `"CoderBlog" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify your email',
            text: 'Verify your email',
            html: emailVerificationTemplate(verificationToken),
        }

        // Send the email
        const info = await transporter.sendMail(mailOptions)

        // Log the preview URL (available only when using Ethereal)
        console.log('Message sent successfully :', info.messageId)
        console.log('verification code: ', verificationToken)
    } catch (error) {
        console.error('Error sending email:', error)
    }
}

export default sendVerificationEmail
