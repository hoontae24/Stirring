import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env');
const envDefaultPath = path.resolve(process.cwd(), '.env.defaults');
dotenv.config({ path: fs.existsSync(envPath) ? envPath : envDefaultPath });

/**
 * Configure variables
 */
const config = {
  DEV: process.env.NODE_ENV !== 'production',
  PROD: process.env.NODE_ENV === 'production',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 3001,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'postgres',
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'development',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'development',
  DATABASE_NAME: process.env.DATABASE_NAME || 'stirring',
  DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
  DATABASE_PORT: Number(process.env.DATABASE_PORT) || 3306,
  HASH_SECRET: process.env.HASH_SECRET || 'hash_secret',
  JWT_SECRET: process.env.JWT_SECRET || 'jwt_secret',
  PROVIDER: process.env.PROVIDER || 'dev_provider',
};

export default config;
