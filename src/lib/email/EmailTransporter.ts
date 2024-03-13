import nodemailer from 'nodemailer';
import EnvironmentVars from '../../constants/EnvironmentVars';

// Create a Nodemailer transporter.
export const EmailTransporter = nodemailer.createTransport({
    host: EnvironmentVars.EMAIL.HOST,
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: EnvironmentVars.EMAIL.USER,
        pass: EnvironmentVars.EMAIL.PASSWORD
    }
});