import CustomError, { CustomErrorConstructor } from 'lib/errors/CustomError';
import authErrors from './auth';
import userErrors from './user';

export interface ErrorCase {
  name: string;
  ErrorType: CustomErrorConstructor<CustomError>;
  message: string;
  status?: number;
}

const errors = {
  ...authErrors,
  ...userErrors,
};

export default errors;
