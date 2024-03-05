import { Request } from "express";
import { UserSession } from "../../../types/User";

export function HasUserSession (req: Request) : boolean
{
    // @ts-ignore
    return req.session.user != undefined;
}

export function GetUserSession (req: Request) : UserSession
{
    // @ts-ignore
    return req.session.user;
}