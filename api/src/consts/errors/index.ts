import CustomError, {
  CustomErrorConstructor,
} from '@/lib/errors/CustomError';

import authErrors from './auth';
import actionErrors from './action';

export interface ErrorCase {
  name: string;
  ErrorType: CustomErrorConstructor<CustomError>;
  message: string;
  status?: number;
}

const errors = {
  ...authErrors,
  ...actionErrors,
};

export default errors;
