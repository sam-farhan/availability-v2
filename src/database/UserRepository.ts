import { databaseConnection } from './DatabaseConnection';
import { UserSelect, UserUpdate, UserCreate } from '../types/database/UserTable';
import { UserMetadata } from '../types/User';

export async function GetAllUsers() {
  return <UserSelect[]>await databaseConnection.selectFrom('user')
    .selectAll()
    .execute();
};

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

export async function UpdateUserMetadata(id: number, newMetadata: UserMetadata) {
  await databaseConnection.updateTable('user')
    .set({ metadata: JSON.stringify(newMetadata) })
    .where('id', '=', id)
    .execute()
};

export async function CreateUser(user: UserCreate) {
  return await databaseConnection.insertInto('user')
    .values(user)
    .executeTakeFirst()
};

export async function DeleteUser(id: number) {
  return await databaseConnection.deleteFrom("user").where('id', '=', id)
    .executeTakeFirst()
};