import { Request, Response } from "express";
import { validationResult } from "express-validator";
import moment from "moment";
import { SquadCreate } from "../types/database/SquadTable";
import { CreateSquad, FindSquad } from "../database/SquadRepository";
import { AddUserToSquad, GetSquadUsers, GetUserInSquad, RemoveUserFromSquad, UpdateUserRoleInSquad } from "../database/Squad_UserRepository";
import { Squad_UserCreate } from "../types/database/Squad_UserTable";
import { SquadMetadata, SquadRoleCoach, SquadRoleRower, SquadUser } from "../types/Squad";
import { UserSession } from "../types/User";
import { GetAllUsers } from "../database/UserRepository";
import { UserSelect } from "../types/database/UserTable";

export async function ViewSquad (req: Request, res: Response) {
    // Run validation.
    const errors = validationResult(req);
    // If we have validation errors, return them.
    if (!errors.isEmpty()) {
        return res.render("pages/errors/404");
    }

    const squadId = parseInt(req.params.id);
    // @ts-ignore
    const user: UserSession = req.session.user;

    try {
        const squad = await FindSquad(squadId);
        if(!squad)
            return res.render("pages/errors/404");
        const squadUsers = await GetSquadUsers(squad.id);
        const currentUserInSquad = squadUsers.find(s => s.id == user.id);
        squadUsers.sort((a, b) => {
            if (a.role === 'Coach' && b.role === 'Rower') {
                return -1; // 'Coach' comes before 'Rower'
            } else if (a.role === 'Rower' && b.role === 'Coach') {
                return 1; // 'Rower' comes after 'Coach'
            } else {
                return 0; // No change in order
            }
        });
        const allUsers = await GetAllUsers();
        const squadPotentialUsers = subtractUsers(allUsers, squadUsers);
        return res.render("pages/squad/squad", {
            squad: squad,
            squadUsers: squadUsers,
            otherUsers: squadPotentialUsers,
            myRole: currentUserInSquad?.role
        });
    } catch (error) {
        console.error(error);
    }
    return res.render("pages/errors/503");
}

export async function ViewSquadAvailability (req: Request, res: Response) {
    // Run validation.
    const errors = validationResult(req);
    // If we have validation errors, return them.
    if (!errors.isEmpty()) {
        return res.render("pages/errors/404");
    }

    const squadId = parseInt(req.params.id);
    const year = parseInt(req.params.year);
    const week = parseInt(req.params.week);
    const momentWeek = moment().year(year).week(week).startOf("week");

    res.send(`Year: ${year} week: ${week}`);
}

function subtractUsers(allUsers: UserSelect[], squadUsers: SquadUser[]): UserSelect[] {
    const squadUserIds = new Set(squadUsers.map(user => user.id));
    return allUsers.filter(user => !squadUserIds.has(user.id));
}

export async function CreateSquadController (req: Request, res: Response) {
    // Run validation.
    const errors = validationResult(req);
    // If we have validation errors, return them.
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // @ts-ignore
    const user: UserSession = req.session.user;
    const name = req.body.name;

    const metadata: SquadMetadata = {
        created_by_email: user.email,
        created_on: moment().format("YYYY-MM-DD HH:MM:SS")
    }
    const newSquad: SquadCreate = {
        name: name,
        metadata: JSON.stringify(metadata)
    };

    try {
        const squadDb = await CreateSquad(newSquad);
        const newSquad_User: Squad_UserCreate = {
            user_id: user.id,
            squad_id: squadDb.id,
            role: SquadRoleCoach
        };
        await AddUserToSquad(newSquad_User);
        user.squads.push(squadDb);
        return res.status(201).send(`/squad/${squadDb.id}`);
    } catch (error) {
        console.error(error);
    }
    return res.render("pages/errors/503");
}

export async function AddUserToSquadController (req: Request, res: Response) {
    // Run validation.
    const errors = validationResult(req);
    // If we have validation errors, return them.
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // @ts-ignore
    const user: UserSession = req.session.user;
    const squadId = parseInt(req.params.id);
    const userId = parseInt(req.body.user);

    const userInSquad = await GetUserInSquad(userId, squadId);
    if(userInSquad != undefined) {
        const userAlreadyInSquadError = {
            msg: "This user is already a squad member.",
            path: "user"
        }
        return res.status(401).json({ errors: [userAlreadyInSquadError] });
    }

    try {
        const newSquadUser: Squad_UserCreate = {
            role: SquadRoleRower,
            squad_id: squadId,
            user_id: userId
        }
        await AddUserToSquad(newSquadUser);
        return res.status(201).send("Ok.");
    } catch (error) {
        console.error(error);
    }

    return res.status(503).send("Something went wrong.");
}

export async function RemoveUserFromSquadController (req: Request, res: Response) {
    // Run validation.
    const errors = validationResult(req);
    // If we have validation errors, return them.
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // @ts-ignore
    const user: UserSession = req.session.user;
    const squadId = parseInt(req.params.id);
    const userId = parseInt(req.body.user);

    try {
        await RemoveUserFromSquad(userId, squadId);
        // If the current user was the one removed, remove this squad from their list of session squads.
        if(user.id == userId) {
            user.squads = user.squads.filter(s => s.id != squadId);
        }
        return res.status(200).send("Ok.");
    } catch (error) {
        console.error(error);
    }

    return res.status(503).send("Something went wrong.");
}

export async function ChangeUserRoleInSquadController (req: Request, res: Response) {
    // Run validation.
    const errors = validationResult(req);
    // If we have validation errors, return them.
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // @ts-ignore
    const user: UserSession = req.session.user;
    const squadId = parseInt(req.params.id);
    const userId = parseInt(req.body.user);
    const userRole = req.body.role;

    try {
        await UpdateUserRoleInSquad(userId, squadId, userRole);
        return res.status(200).send("Ok.");
    } catch (error) {
        console.error(error);
    }

    return res.status(503).send("Something went wrong.");
}