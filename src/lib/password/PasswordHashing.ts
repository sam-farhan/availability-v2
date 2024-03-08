import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function UserPasswordMatching(userPassword: string, passwordProvided: string): Promise<boolean> {
    try {
        return await bcrypt.compare(passwordProvided, userPassword);
    } catch (error) {
        throw new Error('Could not compare password.');
    }
}

export async function HashPassword(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw new Error('Could not hash password.');
    }
}