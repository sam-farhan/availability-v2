import {
    Generated,
    Insertable,
    Selectable
} from 'kysely';

export interface PasswordResetTable {
    id: Generated<number>;
    ip: string;
    email: string;
    timestamp: string;
    hash: string;
    active: Generated<number>;
};

export type PasswordResetSelect = Selectable<PasswordResetTable>;
export type PasswordResetCreate = Insertable<PasswordResetTable>;
