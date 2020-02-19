import { User } from 'models';
import Errors from 'consts/errors';

export type Credentials = {
  email: string;
  name: string;
  password: string;
};

const validate = async (credentials: Credentials): Promise<boolean> => {
  if (!credentials) throw Errors.USER_REGISTER_DATA_EMPTY;

  const { email, name, password } = credentials;
  if (!email) throw Errors.USER_REGISTER_EMAIL_EMPTY;
  if (!name) throw Errors.USER_REGISTER_NAME_EMPTY;
  if (!password) throw Errors.USER_REGISTER_PASSWORD_EMPTY;

  // TODO: 구현, 유저 정보 형식 검증하기

  return true;
};

const exists = async (email: string): Promise<boolean> => {
  const user = await User.findOne({ email });
  return Boolean(user);
};

const register = async (user: User) => {
  const exists = await User.findOne({ email: user.email });
  if (exists) throw Errors.USER_REGISTER_EMAIL_DUPLICATED;

  if (!(user.password && user.password.trim())) {
    throw Errors.USER_REGISTER_PASSWORD_EMPTY;
  }

  const newUser = await User.create(user);
  return newUser;
};

export default { register, validate, exists };
