import {
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable
} from 'kysely';
import { UserMetadata } from '../User';

export interface UserTable {
    // `Generated` type specifies this attribute is handled by the database.
    id: Generated<number>;
    name: string;
    password: string;
    email: string;
    // You can specify JSON columns using the `JSONColumnType` wrapper.
    // It is a shorthand for `ColumnType<T, string, string>`, where T
    // is the type of the JSON object/array retrieved from the database,
    // and the insert and update types are always `string` since you're
    // always stringifying insert/update values.
    metadata: JSONColumnType<UserMetadata>;
};

// You should not use the table schema interfaces directly. Instead, you should
// use the `Selectable`, `Insertable` and `Updateable` wrappers. These wrappers
// make sure that the correct types are used in each operation.
export type UserSelect = Selectable<UserTable>;
export type UserCreate = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;