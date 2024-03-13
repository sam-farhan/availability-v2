import { NextFunction, Request, Response } from "express";
import EnvironmentVars from "../constants/EnvironmentVars";

export function CheckMaintenanceMode (req: Request, res: Response, next: NextFunction) {
    if(EnvironmentVars.APP.MAINTENANCE_MODE) {
        return res.render("pages/maintenance");
    }
    next();
};
