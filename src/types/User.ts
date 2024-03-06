import { Squad } from "./Squad";

export interface UserSession {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    squads: Squad[];
}

export interface UserMetadata {
    last_login: string;
    ip: string | null;
    agent: string | null;
}