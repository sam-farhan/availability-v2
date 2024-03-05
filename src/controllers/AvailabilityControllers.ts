import { Request, Response, request } from "express";
import { validationResult } from "express-validator";
import moment from "moment";
import { AvailabilitySlotData } from "../types/Availability";
import { FindAvailability, SaveAvailability } from "../database/AvailabilityRepository";
import { AvailabilityCreate } from "../types/database/AvailabilityTable";

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

export async function SubmitAvailability (req: Request, res: Response) {
    // Run validation.
    const errors = validationResult(req);
    // If we have validation errors, return them.
    if (!errors.isEmpty()) {
        return res.status(400).send("Something went wrong.");
    }

    // @ts-ignore
    const user = req.session.user;
    const year = parseInt(req.params.year);
    const week = parseInt(req.params.week);
    
    if(await FindAvailability(user.id, year, week) != undefined) {
        return res.status(400).send("Availability for this week already saved.");
    }

    const availability = req.body.availability;
    // Sort the list by day.
    req.body.availability.sort(function(a: AvailabilitySlotData, b: AvailabilitySlotData) {
        return a.day - b.day;
    });

    const newAvailability: AvailabilityCreate = {
        availability_user: user.id,
        year: year,
        week: week,
        data: JSON.stringify(availability)
    }
    await SaveAvailability(newAvailability);

    res.status(201).send("Ok.");
}