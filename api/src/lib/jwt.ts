import jwt from 'jsonwebtoken';

import { env, config } from 'consts';

export interface Decoded {
  id?: string;
  email?: string;
  str?: string;
}

const sign = data => {
  const options = {
    expiresIn: config.JWT_EXPIRESIN,
    issuer: env.PROVIDER,
    subject: 'auth_certification',
  };
  const token = jwt.sign(data, env.JWT_SECRET, options);
  return token;
};

const verify = (token: string): Decoded | null => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (typeof decoded === 'string') {
      return { str: decoded };
    }
    return decoded;
  } catch (e) {
    return null;
  }
};

export default { sign, verify };
