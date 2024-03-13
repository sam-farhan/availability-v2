import { NextFunction, Request, Response } from "express";
import { GetUserSession } from "../lib/auth/UserSession";

export function AddUserSessionToLocals (req: Request, res: Response, next: NextFunction) {
    const userSession = GetUserSession(req);
    res.locals.userSession = userSession;
    next();
};

// Checks if the user has a session.
// If they don't, take them to the sign in page.
export function RequireUserSession(req: Request, res: Response, next: NextFunction) {
    const userSession = GetUserSession(req);
    if (!userSession) {
        const originalUrl = req.originalUrl;
        return res.redirect(`/auth/signin?target=${originalUrl}`);
    }
    next();
}

// Checks if the user has no session.
// If they do, take them to the profile page.
export function CheckNoUserSession(req: Request, res: Response, next: NextFunction) {
    const userSession = GetUserSession(req);
    if (userSession) {
        return res.redirect("/user/profile");
    }
    next();
}