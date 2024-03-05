import { AvailabilityTable } from "./AvailabilityTable"
import { UserTable } from "./UserTable"

export interface Database {
    user: UserTable;
    availability: AvailabilityTable;
};