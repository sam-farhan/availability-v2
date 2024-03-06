import {
    Generated,
    Insertable,
    Selectable,
    Updateable
} from 'kysely';

export interface SquadTable {
    id: Generated<number>;
    name: string;
};

export type SquadSelect = Selectable<SquadTable>;
export type SquadCreate = Insertable<SquadTable>;
export type SquadUpdate = Updateable<SquadTable>;