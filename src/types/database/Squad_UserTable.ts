import {
    Generated,
    Insertable,
    Selectable,
} from 'kysely';

export interface Squad_UserTable {
    squad_id: number;
    user_id: number;
    role: string;
};

export type Squad_UserSelect = Selectable<Squad_UserTable>;
export type Squad_UserCreate = Insertable<Squad_UserTable>;
