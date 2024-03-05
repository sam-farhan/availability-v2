import { databaseConnection } from './DatabaseConnection';
import { UserSelect, UserUpdate, UserCreate } from '../types/database/UserTable';

export async function FindUserByID(id: number) {
  return <UserSelect>await databaseConnection.selectFrom('user')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
};

export async function FindUserByEmail(email: string) {
  return <UserSelect>await databaseConnection.selectFrom('user')
    .where('email', '=', email)
    .selectAll()
    .executeTakeFirst();
};

export async function UpdateUser(id: number, updateWith: UserUpdate) {
  await databaseConnection.updateTable('user').set(updateWith).where('id', '=', id).execute()
};

export async function CreateUser(user: UserCreate) {
  return await databaseConnection.insertInto('user')
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow()
};

export async function DeleteUser(id: number) {
  return await databaseConnection.deleteFrom("user").where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
};