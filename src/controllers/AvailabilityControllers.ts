import { Request, Response } from "express";
import { validationResult } from "express-validator";
import moment from "moment";

export async function MyAvailability (req: Request, res: Response) {
    // Run validation.
    const errors = validationResult(req);
    // If we have validation errors, return them.
    if (!errors.isEmpty()) {
        return res.render("pages/errors/week-not-found");
    }

    const year = parseInt(req.params.year);
    const week = parseInt(req.params.week);
    var momentWeek = moment().year(year).week(week).startOf("week");

    res.render("pages/availability/myavailability",
    {
        year: year,
        week: week,
        momentWeek: momentWeek
    });
}