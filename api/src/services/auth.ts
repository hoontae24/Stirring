import { User } from 'models';
import jwt from 'lib/jwt';
import { errors } from 'consts';

const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw errors.AUTH_LOGIN_EMAIL_UNREGISTERED;

  const verified = user.verifyPassword(password);
  if (!verified) throw errors.AUTH_LOGIN_PASSWORD_UNMATCHED;

  const token = jwt.sign({ id: user.id, email: user.email });

  return { user, token };
};

const verifyToken = async (token: string) => {
  const decoded = jwt.verify(token);
  if (decoded) {
    const { id } = decoded;
    const user = await User.findById(id);
    return { user, decoded };
  }
  return { user: null, decoded: null };
};

export default {
  login,
  verifyToken,
};
