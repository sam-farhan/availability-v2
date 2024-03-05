import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { Database } from '../types/database/Database';
import EnvironmentVars from '../constants/EnvironmentVars';

const dialect = new PostgresDialect({
    pool: new Pool({
        database: EnvironmentVars.DATABASE.NAME,
        host: EnvironmentVars.DATABASE.HOST,
        user: EnvironmentVars.DATABASE.USER,
        password: EnvironmentVars.DATABASE.PASSWORD,
        port: EnvironmentVars.DATABASE.PORT,
        max: 10,
    })
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
export const databaseConnection = new Kysely<Database>({
    dialect,
});