import { Squad_UserCreate } from '../types/database/Squad_UserTable';
import { databaseConnection } from './DatabaseConnection';

export async function AddUserToSquad(squad_user: Squad_UserCreate) {
  return await databaseConnection.insertInto('squad_user')
    .values(squad_user)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export async function RemoveUserFromSquad(userId: number, squadId: number) {
  return await databaseConnection.deleteFrom("squad_user")
    .where('user_id', '=', userId)
    .where('squad_id', '=', squadId)
    .returningAll()
    .executeTakeFirst()
};