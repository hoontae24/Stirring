interface CustomError {
  name: string;
  message: string;

  toJson: () => { [key: string]: any };
}

export interface CustomErrorConstructor<T extends CustomError> {
  new (...args: any[]): T;
}

export default CustomError;
