import { NextFunction, Request, Response } from "express";
import moment from "moment";

export function AddMomentToLocals (req: Request, res: Response, next: NextFunction) {
    res.locals.moment = moment;
    next();
};