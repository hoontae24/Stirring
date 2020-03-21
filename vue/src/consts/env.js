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
const env = {
  DEV: process.env.NODE_ENV !== 'production',
  NODE_ENV: process.env.NODE_ENV,
};

export default env;
