import jwt from 'jsonwebtoken';

import { env } from 'consts';

const sign = data => {
  const options = {
    expiresIn: '7d',
    issuer: env.PROVIDER,
    subject: 'auth_certification',
  };
  const token = jwt.sign(data, env.JWT_SECRET, options);
  return token;
};

const verify = token => {
  const decoded = jwt.verify(token, env.JWT_SECRET);
  return decoded;
};

export default { sign, verify };
