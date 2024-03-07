import { Request, Response, request } from "express";
import { validationResult } from "express-validator";
import moment from "moment";
import { AvailabilitySlotData } from "../types/Availability";
import { FindAvailability, CreateAvailability, UpdateAvailability } from "../database/AvailabilityRepository";
import { AvailabilityCreate, AvailabilityUpdate } from "../types/database/AvailabilityTable";

export async function MyAvailability (req: Request, res: Response) {
    // Run validation.
    const errors = validationResult(req);
    // If we have validation errors, return them.
    if (!errors.isEmpty()) {
        return res.render("pages/errors/week-not-found");
    }

    // @ts-ignore
    const user = req.session.user;
    const year = parseInt(req.params.year);
    const week = parseInt(req.params.week);
    const momentWeek = moment().year(year).week(week).startOf("week");
    const existingAvailability = await FindAvailability(user.id, year, week);

    if(existingAvailability != undefined) {
        return res.render("pages/availability/myavailability-readonly",
        {
            year: year,
            week: week,
            momentWeek: momentWeek,
            availability: existingAvailability.data
        });
    }

    res.render("pages/availability/myavailability",
    {
        year: year,
        week: week,
        momentWeek: momentWeek,
        editing: false
    });
}

export async function EditAvailability (req: Request, res: Response) {
    // Run validation.
    const errors = validationResult(req);
    // If we have validation errors, return them.
    if (!errors.isEmpty()) {
        return res.render("pages/errors/week-not-found");
    }

    // @ts-ignore
    const user = req.session.user;
    const year = parseInt(req.params.year);
    const week = parseInt(req.params.week);
    const momentWeek = moment().year(year).week(week).startOf("week");
    const existingAvailability = await FindAvailability(user.id, year, week);

    if(existingAvailability == undefined) {
        return res.render("pages/availability/myavailability",
        {
            year: year,
            week: week,
            momentWeek: momentWeek,
            editing: false
        });
    }

    res.render("pages/availability/myavailability",
    {
        year: year,
        week: week,
        momentWeek: momentWeek,
        availability: existingAvailability.data,
        editing: true
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
    const availability = req.body.availability;
    // Sort the list by day.
    req.body.availability.sort(function(a: AvailabilitySlotData, b: AvailabilitySlotData) {
        return a.day - b.day;
    });

    try {
        const existing = await FindAvailability(user.id, year, week);
        if(existing != undefined) {
            const updatedAvailability: AvailabilityUpdate = {
                availability_user: user.id,
                year: year,
                week: week,
                data: JSON.stringify(availability)
            };
            await UpdateAvailability(existing.id, updatedAvailability);
        } else {
            const newAvailability: AvailabilityCreate = {
                availability_user: user.id,
                year: year,
                week: week,
                data: JSON.stringify(availability)
            }
            await CreateAvailability(newAvailability);
        }
    
        return res.status(201).send("Ok.");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong, please try again later.");
    }
}

export async function CopyAvailability (req: Request, res: Response) {
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

    var lastWeek = week - 1;
    var lastWeekYear = year;
    if(lastWeek <= 0) {
        lastWeek = 52;
        lastWeekYear --;
    }

    try {
        const lastWeekDb = await FindAvailability(user.id, lastWeekYear, lastWeek);
        if(lastWeekDb == undefined) {
            return res.status(400).send(`Availability not saved for ${lastWeekYear}, week ${lastWeek}.`);
        }

        const thisWeekDb = await FindAvailability(user.id, year, week);

        if(thisWeekDb == undefined) {
            const newAvailability: AvailabilityCreate = {
                availability_user: user.id,
                year: year,
                week: week,
                data: JSON.stringify(lastWeekDb.data)
            }
            await CreateAvailability(newAvailability);
        } else {
            const updatedAvailability: AvailabilityUpdate = {
                availability_user: user.id,
                year: year,
                week: week,
                data: JSON.stringify(lastWeekDb.data)
            };
            await UpdateAvailability(thisWeekDb.id, updatedAvailability);
        }

        return res.status(201).send("Ok.");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong, please try again later.");
    }
}