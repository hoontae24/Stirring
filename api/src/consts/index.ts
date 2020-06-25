import { resolve } from 'path';

export { default as env } from './env';
export { default as errors } from './errors';
export { default as config } from './config';

export const uploadDir = resolve(process.cwd(), 'uploads/');
