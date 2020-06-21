import CustomError, { CustomErrorConstructor } from '@/lib/errors/CustomError';

import authErrors from './auth';

export interface ErrorCase {
  name: string;
  ErrorType: CustomErrorConstructor<CustomError>;
  message: string;
  status?: number;
}

const errors = {
  ...authErrors,
};

export default errors;
