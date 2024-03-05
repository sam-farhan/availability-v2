import {
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable
} from 'kysely';
import { AvailabilitySlotData } from '../Availability';

export interface AvailabilityTable {
    id: Generated<number>;
    availability_user: number;
    year: number;
    week: number;
    data: JSONColumnType<AvailabilitySlotData>;
};

export type AvailabilitySelect = Selectable<AvailabilityTable>;
export type AvailabilityCreate = Insertable<AvailabilityTable>;
export type AvailabilityUpdate = Updateable<AvailabilityTable>;