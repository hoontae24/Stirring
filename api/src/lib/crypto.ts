import crypto from 'crypto';
import { env } from 'consts';

const createHash = (data: string) => {
  return crypto
    .createHmac('sha1', env.HASH_SECRET)
    .update(data)
    .digest('base64');
};

export default {
  createHash,
};
