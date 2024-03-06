import { NextFunction, Request, Response } from "express";
import { GetUserInSquad } from "../database/Squad_UserRepository";
import { GetUserSession } from "../public/lib/auth/UserSession";
import { SquadRoleCoach, SquadRoleRower } from "../types/Squad";

export async function CheckUserInSquad(req: Request, res: Response, next: NextFunction) {
    const userSession = GetUserSession(req);
    const squadId = parseInt(req.params.id);
    const userInSquad = await GetUserInSquad(userSession.id, squadId);
    if(userInSquad == undefined) {
        return res.redirect("/");
    }
    next();
}

export const userRoleValid = (role: string) => {
    if(role != SquadRoleCoach && role != SquadRoleRower)
        throw new Error("Unrecognised role.");
    return true;
};