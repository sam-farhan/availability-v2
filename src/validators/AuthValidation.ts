import { FindUserByEmail } from "../database/UserRepository";
import { body } from "express-validator";

export const userEmailIsUnique = async (email: string) => {
    try {
        const user = await FindUserByEmail(email);
        if (user != undefined) {
            return Promise.reject(new Error("E-mail is already in use."));
        }
        return Promise.resolve(true);
    } catch (error) {
        console.error(error);
        return Promise.reject(new Error("Something went wrong."));
    } 
};

export const userPasswordIsValid = (password: string) => {
    const length = password.length;
    if(length < 8)
        throw new Error("Password must be at least 8 characters.");
    return true;
};

export const validatePasswordMatch = [
    body('password').notEmpty().withMessage('Password is required.'),
    body('passwordConfirm').notEmpty().withMessage('Password confirmation is required.'),
    body('passwordConfirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match.');
        }
        return true;
    })
];