import { EmailTransporter } from "./EmailTransporter";

export async function SendEmail (from: string, recipient: string, subject: string, body: string) {
    const transporter = EmailTransporter;

    // Define email options.
    const mailOptions = {
        from: from,
        to: recipient,
        subject: subject,
        text: body
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