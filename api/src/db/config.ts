import { Options } from 'sequelize';

import { env } from '@/consts';

const options: { [nodeEnv: string]: Options } = {
  development: {
    username: env.DATABASE_USERNAME || 'development',
    password: env.DATABASE_PASSWORD || 'development',
    database: env.DATABASE_NAME || 'stirring',
    host: env.DATABASE_HOST || 'localhost',
    dialect: (env.DATABASE_DIALECT || 'mysql') as Options['dialect'],
    operatorsAliases: undefined,
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },

  production: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    dialect: env.DATABASE_DIALECT as Options['dialect'],
    operatorsAliases: undefined,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};

export default options[env.NODE_ENV];
