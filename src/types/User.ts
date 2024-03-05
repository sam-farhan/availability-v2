export interface UserSession {
    email: string;
    name: string;
}

export interface UserMetadata {
    last_login: string;
    ip: string | null;
    agent: string | null;
}