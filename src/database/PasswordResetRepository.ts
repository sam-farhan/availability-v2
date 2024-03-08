import moment from 'moment';
import { PasswordResetCreate, PasswordResetSelect } from '../types/database/PasswordResetTable';
import { databaseConnection } from './DatabaseConnection';

export async function CreatePasswordReset(request: PasswordResetCreate) {
  return await databaseConnection.insertInto('password_reset')
    .values(request)
    .executeTakeFirstOrThrow();
};

export async function FindRecentPasswordResetsByIP(ip: string) {
  const recentThreshold = moment().subtract(15, "minutes").utc().format("YYYY-MM-DD HH:mm:ss");
  return <PasswordResetSelect[]>await databaseConnection.selectFrom('password_reset')
    .where('ip', '=', ip)
    .where("timestamp", ">=", recentThreshold)
    .selectAll()
    .execute();
};