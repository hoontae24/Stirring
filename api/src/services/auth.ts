import { User } from 'models';
import jwt from 'lib/jwt';
import Errors from 'consts/errors';

const validate = async (email: string, password: string) => {
  return true;
};

const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw Errors.AUTH_LOGIN_EMAIL_UNREGISTERED;

  const verified = user.verifyPassword(password);
  if (!verified) throw Errors.AUTH_LOGIN_PASSWORD_UNMATCHED;

  const token = jwt.sign({ id: user.id, email: user.email });

  return { user, token };
};

export default { validate, login };
