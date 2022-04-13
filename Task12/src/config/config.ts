import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5100,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY,
    ACTIVE_KEY: process.env.ACTIVE_KEY,
    database: process.env.database,
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
    START_SITE: process.env.START_SITE,
};
