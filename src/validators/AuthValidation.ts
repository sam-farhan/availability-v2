import { FindUserByEmail, FindUserByName } from "../database/UserRepository";

export const userEmailIsUnique = async (email: string) => {
    const user = await FindUserByEmail(email);
    if (user != undefined) {
        return Promise.reject(new Error("E-mail is already in use."));
    }
    return Promise.resolve(true);
};

export const userNameIsUnique = async (name: string) => {
    const user = await FindUserByName(name);
    if (user != undefined) {
        return Promise.reject(new Error("Username is already in use."));
    }
    return Promise.resolve(true);
};

export const userPasswordIsValid = (password: string) => {
    const length = password.length;
    if(length < 8)
        throw new Error("Password must be at least 8 characters.");
    return true;
};