import { AvailabilityCreate, AvailabilitySelect } from '../types/database/AvailabilityTable';
import { databaseConnection } from './DatabaseConnection';

export async function FindAvailability(userId: number, year: number, week: number) {
  return <AvailabilitySelect>await databaseConnection.selectFrom('availability')
    .where('availability_user', '=', userId)
    .where("availability.year", "=", year)
    .where("availability.week", "=", week)
    .selectAll()
    .executeTakeFirst();
};

export async function SaveAvailability(availability: AvailabilityCreate) {
  return await databaseConnection.insertInto('availability')
    .values(availability)
    .returningAll()
    .executeTakeFirstOrThrow()
};

// export async function UpdateUser(id: number, updateWith: UserUpdate) {
//   await databaseConnection.updateTable('user').set(updateWith).where('id', '=', id).execute()
// };

// export async function DeleteUser(id: number) {
//   return await databaseConnection.deleteFrom("user").where('id', '=', id)
//     .returningAll()
//     .executeTakeFirst()
// };