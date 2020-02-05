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
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT) || 3001,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || ' development',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || ' development',
  DATABASE_NAME: process.env.DATABASE_NAME || ' development',
  DATABASE_HOST: process.env.DATABASE_HOST || ' development',
  DATABASE_PORT: process.env.DATABASE_PORT || ' 5432'
};

export default config;
