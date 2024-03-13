import { MailOptions } from "nodemailer/lib/smtp-transport";
import { EmailTransporter } from "./EmailTransporter";

export async function SendEmail (from: string, recipient: string, subject: string, body: string, htmlBody: string) {
    const transporter = EmailTransporter;

    // Define email options.
    const mailOptions: MailOptions = {
        from: from,
        to: recipient,
        subject: subject,
        text: body,
        html: htmlBody
    };

    // Send email.
    await transporter.sendMail(mailOptions)
    .then(info => {
        console.log('Email sent:', info.response);
    })
    .catch(error => {
        console.error('Error sending email:', error);
        return Promise.reject();
    });
}