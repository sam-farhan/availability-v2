export default {
    ENVIRONMENT: process.env.ENV || "DEV",
    APP: {
        PORT: process.env.PORT || 3000
    },
    SESSION: {
        ACTIVE: process.env.USE_SESSION || true,
        SECRET: process.env.SESSION_SECRET || "S3CrEtSesSiOn"
    },
    DATABASE: {
        HOST: process.env.DATABASE_HOST || "localhost",
        PORT: parseInt(process.env.DATABASE_PORT || "5432"),
        NAME: process.env.DATABASE_NAME || "availability_db",
        USER: process.env.DATABASE_USER || "postgres",
        PASSWORD: process.env.DATABASE_PASSWORD || "Test123!",
    },
    EMAIL: {
        HOST: process.env.EMAIL_HOST || "localhost",
        USER: process.env.EMAIL_USER || "smtp",
        PASSWORD: process.env.EMAIL_PASSWORD || "Test123!"
    }
} as const;