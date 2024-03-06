import bcrypt from 'bcrypt';
import { UserCreate, UserSelect } from "../types/database/UserTable";
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { CreateUser, FindUserByEmail } from '../database/UserRepository';
import { UserSession, UserMetadata } from '../types/User';
import moment from 'moment';
import { HasUserSession } from '../public/lib/auth/UserSession';
import { GetUserSquads } from '../database/Squad_UserRepository';

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
        ip: req.socket.remoteAddress || null,
        last_login: moment().format("YYYY-MM-DD HH:MM:SS")
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
                msg: "User not found.",
                path: "username"
            }
            return res.status(401).json({ errors: [passwordMatchError] });
        }
        if(await UserPasswordMatching(user, password))
        {
            const squads = await GetUserSquads(user.id);

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

async function UserPasswordMatching(user: UserSelect, passwordProvided: string): Promise<boolean> {
    try {
        return await bcrypt.compare(passwordProvided, user.password);
    } catch (error) {
        throw new Error('Could not compare password.');
    }
}

async function HashPassword(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw new Error('Could not hash password.');
    }
}