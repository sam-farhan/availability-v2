import { SquadCreate, SquadSelect } from '../types/database/SquadTable';
import { databaseConnection } from './DatabaseConnection';

export async function FindSquad(id: number): Promise<SquadSelect> {
  return <SquadSelect>await databaseConnection.selectFrom('squad')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
};

export async function CreateSquad(squad: SquadCreate) {
  return await databaseConnection.insertInto('squad')
    .values(squad)
    .returningAll()
    .executeTakeFirstOrThrow();
};