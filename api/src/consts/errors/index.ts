import CustomError, { CustomErrorConstructor } from 'lib/errors/CustomError';
import authErrors from './auth';
import userErrors from './user';

export interface ErrorCase {
  name: string;
  ErrorType: CustomErrorConstructor<CustomError>;
  message: string;
  status?: number;
}

const Errors = {
  ...authErrors,
  ...userErrors,
};

console.log(Errors);

export default Errors;
