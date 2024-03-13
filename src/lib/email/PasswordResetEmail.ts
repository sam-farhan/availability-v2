import AppConstants from "../../constants/AppConstants";
import { SendEmail } from "./SendEmail";

export async function SendPasswordResetEmail (recipient: string, hash: string, firstName: string, lastName: string, host: string) {
    const emailBody =
    `Hi ${firstName} ${lastName},
    
    We've received a request to reset the password associated with this e-mail address for beschikbaarheid.online. You can reset your password at https://${host}/auth/reset/${hash}/. This link is valid for 15 minutes.
    
    If you didn't make this request yourself then you can safely ignore it.`;

    const emailBodyHtml = `
    Hi ${firstName} ${lastName},
    <br><br>
    We've received a request to reset the password associated with this e-mail address for beschikbaarheid.online. You can reset your password at <a href="https://${host}/auth/reset/${hash}/">https://${host}/auth/reset/${hash}/</a>. This link is valid for 15 minutes.
    <br><br>
    If you didn't make this request yourself then you can safely ignore it.`;

    await SendEmail(AppConstants.Email.SendAddress, recipient, "Password reset request", emailBody, emailBodyHtml);
}