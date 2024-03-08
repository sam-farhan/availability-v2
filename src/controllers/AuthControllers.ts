import { UserCreate, UserSelect, UserUpdate } from "../types/database/UserTable";
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { CreateUser, FindUserByEmail, UpdateUserMetadata } from '../database/UserRepository';
import { UserSession, UserMetadata } from '../types/User';
import moment from 'moment';
import { HasUserSession } from '../public/lib/auth/UserSession';
import { GetUserSquads } from '../database/Squad_UserRepository';
import { HashPassword, UserPasswordMatching } from "../lib/password/PasswordHashing";
import { SendEmail } from "../lib/email/SendEmail";
import AppConstants from "../constants/AppConstants";
import { CreatePasswordReset, FindRecentPasswordResetsByIP } from "../database/PasswordResetRepository";
import { PasswordResetCreate } from "../types/database/PasswordResetTable";

const SALT_ROUNDS = 10;

export async function SignUp (req: Request, res: Response) {
    // Run validation.
    const errors = validationResult(req);
    // If we have validation errors, return them.
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await HashPassword(password);

    const metadata: UserMetadata = {
        agent: req.get('user-agent') || null,
        ip: req.ip || null,
        last_login: moment().utc().format("YYYY-MM-DD HH:mm:ss")
    };

    const newUser: UserCreate = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashedPassword,
        metadata: JSON.stringify(metadata)
    };

    try {
        CreateUser(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong, please try again later.");
    }

    res.status(200).send("/auth/signin");
}

export async function SignIn (req: Request, res: Response) {
    // Run validation.
    const errors = validationResult(req);
    // If we have validation errors, return them.
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = <UserSelect>await FindUserByEmail(email);
        if(!user) {
            const passwordMatchError = {
                msg: "Account not found.",
                path: "email"
            }
            return res.status(401).json({ errors: [passwordMatchError] });
        }
        if(await UserPasswordMatching(user.password, password))
        {
            const squads = await GetUserSquads(user.id);

            const metadata: UserMetadata = {
                agent: req.get('user-agent') || null,
                ip: req.ip || null,
                last_login: moment().utc().format("YYYY-MM-DD HH:mm:ss")
            };

            await UpdateUserMetadata(user.id, metadata);

            const userSession: UserSession = {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                squads: squads
            }
            // @ts-ignore
            req.session.user = userSession;
            return res.status(200).send("/user/profile");
        }
        else
        {
            const passwordMatchError = {
                msg: "Password is incorrect.",
                path: "password"
            }
            return res.status(401).json({ errors: [passwordMatchError] });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong, please try again later.");
    }
}

export async function SignOut (req: Request, res: Response) {
    if(!HasUserSession(req)) {
        return res.status(401).send("Session does not exist.");
    }

    req.session.destroy((error) => {
        if (error) {
            console.error('Error destroying session: ', error);
            return res.status(500).send("Something went wrong, please try again later.");
        }
        res.status(200).redirect("/");
    });
}

export async function ResetPassword (req: Request, res: Response) {
    // Run validation.
    const errors = validationResult(req);
    // If we have validation errors, return them.
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;

    try {
        const user = <UserSelect>await FindUserByEmail(email);
        // If no user found, still reply with 200 Ok. as to not reveal a matching User in database.
        if(!user) {
            console.log(`Attempt to reset password failed as no User found with the e-mail address ${email}.`);
            return res.status(200).send("Ok.");
        }
        console.log(`Attempt to reset password for User with e-mail address ${email}.`);

        const ip = req.headers['x-forwarded-for']?.at(0) || req.socket.remoteAddress || "";

        const recentRequestsFromIp = await FindRecentPasswordResetsByIP(ip);

        if(recentRequestsFromIp.length >= 3)
        {
            return res.status(403).send("Too many requests.");
        }

        const passwordReset: PasswordResetCreate = {
            email: email,
            ip: ip,
            timestamp: moment().utc().format("YYYY-MM-DD HH:mm:ss")
        }
        await CreatePasswordReset(passwordReset);

        // const emailBody =
        // `Hi ${user.first_name} ${user.last_name},
        
        // We've received a request to reset the password associated with this e-mail address for beschikbaarheid.online.

        // If you didn't make this request yourself you can safely ignore it.`;
        // SendEmail(AppConstants.Email.SendAddress, email, "Password reset", emailBody);
        return res.status(200).send("Ok.");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong, please try again later.");
    }
}