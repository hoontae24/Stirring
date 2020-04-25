import { errors } from '@/consts';

import Service from './Service';

// export type Credentials = {
//   email: string;
//   name: string;
//   password: string;
// };

// const validate = async (credentials: Credentials): Promise<boolean> => {
//   if (!credentials) throw errors.USER_REGISTER_DATA_EMPTY;

//   const { email, name, password } = credentials;
//   if (!email) throw errors.USER_REGISTER_EMAIL_EMPTY;
//   if (!name) throw errors.USER_REGISTER_NAME_EMPTY;
//   if (!password) throw errors.USER_REGISTER_PASSWORD_EMPTY;

//   // TODO: 구현, 유저 정보 형식 검증하기

//   return true;
// };

// const exists = async (email: string): Promise<boolean> => {
//   const user = await User.findOne({ email });
//   return Boolean(user);
// };

// export default {  validate, exists };

class User extends Service {
  //
}

export default User;
