import { User } from 'models';
import jwt from 'lib/jwt';
import Errors from 'consts/errors';

const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw Errors.AUTH_LOGIN_EMAIL_UNREGISTERED;

  const verified = user.verifyPassword(password);
  if (!verified) throw Errors.AUTH_LOGIN_PASSWORD_UNMATCHED;

  const token = jwt.sign({ id: user.id, email: user.email });

  return { user, token };
};

const verifyToken = async token => {
  const decoded = jwt.verify(token);
  if (decoded) {
    const { id } = decoded;
    const user = await User.findById(id);
    return user;
  }
  return null;
};

export default {
  login,
  verifyToken,
};
