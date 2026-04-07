import 'dotenv/config';
import * as joi from 'joi';

interface ENV_SCHEMA {
  API_PORT: number;
  API_VERSION: string;
  APP_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_CONEXION: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: number;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES_IN: number;
  MAIL_HOST: string;
  MAIL_PORT: number;
  MAIL_USER: string;
  MAIL_PASSWORD: string;
  MAIL_FROM: string;
  APP_ENV: 'development' | 'production' | 'test';
  APP_REGISTER: string;
  FRONTEND_URL: string;
}

const schema = joi
  .object<ENV_SCHEMA>({
    API_PORT: joi.number().required(),
    API_VERSION: joi.string().required(),
    APP_NAME: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_NAME: joi.string().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_CONEXION: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRES_IN: joi.number().required(),
    JWT_REFRESH_SECRET: joi.string().required(),
    JWT_REFRESH_EXPIRES_IN: joi.number().required(),
    MAIL_HOST: joi.string().required(),
    MAIL_PORT: joi.number().required(),
    MAIL_USER: joi.string().required(),
    MAIL_PASSWORD: joi.string().required(),
    MAIL_FROM: joi.string().required(),
    APP_ENV: joi.string().required(),
    APP_REGISTER: joi.string().required(),
    FRONTEND_URL: joi.string().required(),
  })
  .unknown();

const { error, value } = schema.validate(process.env) as {
  error: joi.ValidationError | null;
  value: ENV_SCHEMA;
};

if (error) {
  throw new Error(error.message);
}

export const envs = {
  app: {
    env: value.APP_ENV,
    name: value.APP_NAME,
    frontendUrl: value.FRONTEND_URL,
    register: value.APP_REGISTER,
  },
  api: {
    port: value.API_PORT,
    version: value.API_VERSION,
  },
  jwt: {
    secret: value.JWT_SECRET,
    expiresIn: value.JWT_EXPIRES_IN,
    refreshSecret: value.JWT_REFRESH_SECRET,
    refreshExpiresIn: value.JWT_REFRESH_EXPIRES_IN,
  },
  mail: {
    host: value.MAIL_HOST,
    port: value.MAIL_PORT,
    user: value.MAIL_USER,
    password: value.MAIL_PASSWORD,
    from: value.MAIL_FROM,
  },
  db: {
    host: value.DB_HOST,
    port: value.DB_PORT,
    name: value.DB_NAME,
    user: value.DB_USER,
    password: value.DB_PASSWORD,
    conexion: value.DB_CONEXION,
  },
};
