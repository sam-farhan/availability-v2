export interface UserSession {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
}

export interface UserMetadata {
    last_login: string;
    ip: string | null;
    agent: string | null;
}