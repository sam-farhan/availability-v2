import { Request, Response } from "express";
import { validationResult } from "express-validator";
import moment from "moment";
import { SquadCreate } from "../types/database/SquadTable";
import { CreateSquad } from "../database/SquadRepository";
import { AddUserToSquad } from "../database/Squad_UserRepository";
import { Squad_UserCreate } from "../types/database/Squad_UserTable";

export async function CreateSquadController (req: Request, res: Response) {
    // Run validation.
    const errors = validationResult(req);
    // If we have validation errors, return them.
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // @ts-ignore
    const user = req.session.user;
    const name = req.body.name;

    const newSquad: SquadCreate = {
        name: name
    };

    try {
        const squadDb = await CreateSquad(newSquad);
        const newSquad_User: Squad_UserCreate = {
            user_id: user.id,
            squad_id: squadDb.id
        };
        await AddUserToSquad(newSquad_User);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong, please try again later.");
    }

    res.status(201).send("/");
}