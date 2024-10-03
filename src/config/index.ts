import dotenv from 'dotenv'
dotenv.config();

interface EnvObject { [key: string]: unknown }

const domain = {
    url: process.env.CLIENT_URL_BASE,
};

const jwt = {
    secret: process.env.JWT_SECRET as string,
    expiration: process.env.JWT_EXPIRATION,
}

const mailgun = {
    domain: process.env.MG_DOMAIN as string,
    apiKey: process.env.MG_API_KEY as string,
}

const pg = {
    user: process.env.PG_USER as string,
    password: process.env.PG_PASSWORD as string,
    host: process.env.PG_HOST as string,
    database: process.env.PG_DATABASE as string,
    port: Number(process.env.PG_PORT as string),
    url: process.env.PG_URL || ''
}

const server = {
    environment: process.env.NODE_ENV,
    isDev: process.env.NODE_ENV?.toLowerCase().includes('dev'),
    isProduction: process.env.NODE_ENV?.toLowerCase().includes('prod'),
    isTest: process.env.NODE_ENV?.toLowerCase().includes('test'),
    port: process.env.PORT || 3000
}

export default {
    domain,
    jwt,
    mailgun,
    pg,
    server
}