import { UserUpdate } from "../types/database/UserTable";
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UpdateUser } from '../database/UserRepository';
import { UserSession } from '../types/User';
import { HashPassword } from '../lib/PasswordHashing';

export async function ChangeDetails (req: Request, res: Response) {
    // Run validation.
    const errors = validationResult(req);
    // If we have validation errors, return them.
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // @ts-ignore
    const user: UserSession = req.session.user;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;

    const userUpdate: UserUpdate = {
        first_name: first_name,
        last_name: last_name,
        email: email
    };

    try {
        await UpdateUser(user.id, userUpdate);
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong, please try again later.");
    }

    res.status(201).send("/user/profile");
}

export async function ChangePassword (req: Request, res: Response) {
    // Run validation.
    const errors = validationResult(req);
    // If we have validation errors, return them.
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // @ts-ignore
    const user: UserSession = req.session.user;
    const password = req.body.password;
    const hashedPassword = await HashPassword(password);

    const userUpdate: UserUpdate = {
        password: hashedPassword
    };

    try {
        await UpdateUser(user.id, userUpdate);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong, please try again later.");
    }

    res.status(201).send("/user/profile");
}