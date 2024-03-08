import { AvailabilityTable } from "./AvailabilityTable"
import { PasswordResetTable } from "./PasswordResetTable";
import { SquadTable } from "./SquadTable";
import { Squad_UserTable } from "./Squad_UserTable";
import { UserTable } from "./UserTable"

export interface Database {
    user: UserTable;
    availability: AvailabilityTable;
    squad: SquadTable;
    squad_user: Squad_UserTable;
    password_reset: PasswordResetTable;
};