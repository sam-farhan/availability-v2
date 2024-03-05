export default {
    ENVIRONMENT: process.env.ENV || "DEV",
    SESSION: {
        ACTIVE: process.env.USE_SESSION || true, // TODO: Set this as default false.
        SECRET: process.env.SESSION_SECRET || "S3CrEtSesSiOn"
    },
    DATABASE: {
        HOST: process.env.DATABASE_HOST || "localhost",
        PORT: parseInt(process.env.DATABASE_PORT || "5432"),
        NAME: process.env.DATABASE_NAME || "app_db",
        USER: process.env.DATABASE_USER || "postgres",
        PASSWORD: process.env.DATABASE_PASSWORD || "Test123!",
    }
} as const;