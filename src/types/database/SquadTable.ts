import {
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable
} from 'kysely';
import { SquadMetadata } from '../Squad';

export interface SquadTable {
    id: Generated<number>;
    name: string;
    metadata: JSONColumnType<SquadMetadata>;
};

export type SquadSelect = Selectable<SquadTable>;
export type SquadCreate = Insertable<SquadTable>;
export type SquadUpdate = Updateable<SquadTable>;