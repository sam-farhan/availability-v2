export interface SquadMetadata {
    created_on: string;
    created_by_email: string;
}

export interface Squad {
    id: number;
    name: string;
    metadata: SquadMetadata;
}

export interface SquadUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}

export const SquadRoleCoach = "Coach";
export const SquadRoleRower = "Rower";