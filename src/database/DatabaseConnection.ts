import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import { Database } from '../types/database/Database';
import EnvironmentVars from '../constants/EnvironmentVars';

const dialect = new MysqlDialect({
    pool: createPool({
        database: EnvironmentVars.DATABASE.NAME,
        host: EnvironmentVars.DATABASE.HOST,
        user: EnvironmentVars.DATABASE.USER,
        password: EnvironmentVars.DATABASE.PASSWORD,
        port: EnvironmentVars.DATABASE.PORT,
        connectionLimit: 10,
    })
});

export const databaseConnection = new Kysely<Database>({
    dialect,
    // log(event) {
    //     if (event.level === 'query') {
    //         console.log(event.query.sql)
    //         console.log(event.query.parameters)
    //     }
    // }
});