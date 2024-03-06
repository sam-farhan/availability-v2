import { SquadUser } from '../types/Squad';
import { SquadSelect } from '../types/database/SquadTable';
import { Squad_UserCreate } from '../types/database/Squad_UserTable';
import { databaseConnection } from './DatabaseConnection';

export async function GetUserSquads(userId: number): Promise<SquadSelect[]> {
  const result = await databaseConnection
    .selectFrom("squad")
    .select("squad.id")
    .select("squad.name")
    .select("squad.metadata")
    .innerJoin("squad_user", 'squad.id', "squad_user.squad_id")
    .where("squad_user.user_id", "=", userId)
    .selectAll()
    .execute();

  return result.map(({ squad_id, name, metadata }) => ({ id: squad_id, name, metadata }));
};

export async function GetSquadUsers(squadId: number): Promise<SquadUser[]> {
  const result = await databaseConnection
    .selectFrom("user")
    .select("user.id")
    .select("user.first_name")
    .select("user.last_name")
    .select("user.email")
    .innerJoin("squad_user", 'user.id', "squad_user.user_id")
    .where("squad_user.squad_id", "=", squadId)
    .selectAll()
    .execute();

    return result.map(({ id, first_name, last_name, email, role }) => ({ id, first_name, last_name, email, role }));
};

export async function GetUserInSquad(userId: number, squadId: number) {
  return await databaseConnection.selectFrom("squad_user")
    .where("squad_user.user_id", "=", userId)
    .where("squad_user.squad_id", "=", squadId)
    .selectAll()
    .executeTakeFirst();
}

export async function UpdateUserRoleInSquad(userId: number, squadId: number, role: string) {
  return await databaseConnection.updateTable("squad_user")
    .set({role: role})
    .where("squad_user.user_id", "=", userId)
    .where("squad_user.squad_id", "=", squadId)
    .executeTakeFirst();
}

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