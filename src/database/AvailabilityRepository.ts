import { AvailabilityCreate, AvailabilitySelect, AvailabilityUpdate } from '../types/database/AvailabilityTable';
import { databaseConnection } from './DatabaseConnection';

export async function FindAvailability(userId: number, year: number, week: number) {
  return <AvailabilitySelect>await databaseConnection.selectFrom('availability')
    .where('availability_user', '=', userId)
    .where("availability.year", "=", year)
    .where("availability.week", "=", week)
    .selectAll()
    .executeTakeFirst();
};

export async function CreateAvailability(availability: AvailabilityCreate) {
  return await databaseConnection.insertInto('availability')
    .values(availability)
    .executeTakeFirstOrThrow();
};

export async function UpdateAvailability(id: number, updateWith: AvailabilityUpdate) {
  await databaseConnection.updateTable('availability').set(updateWith).where('id', '=', id).execute();
};

export async function FindAvailabilityForSquad(squadId: number, year: number, week: number) {
  return <AvailabilitySelect[]>await databaseConnection.selectFrom('availability')
    .innerJoin("squad_user", "availability.availability_user", "squad_user.user_id")
    .where("availability.year", "=", year)
    .where("availability.week", "=", week)
    .where("squad_user.squad_id", "=", squadId)
    .selectAll()
    .execute();
};