import { SquadCreate } from '../types/database/SquadTable';
import { databaseConnection } from './DatabaseConnection';

export async function CreateSquad(squad: SquadCreate) {
  return await databaseConnection.insertInto('squad')
    .values(squad)
    .returningAll()
    .executeTakeFirstOrThrow();
};