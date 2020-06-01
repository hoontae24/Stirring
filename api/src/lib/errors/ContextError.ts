import CustomError from './CustomError';

class ContextError extends Error implements CustomError {
  status: number;
  name: string;
  id: string;
  payload: any;

  constructor(resource: {
    id: string;
    status: number;
    name: string;
    message: string;
  }) {
    super(resource.message);
    this.id = resource.id;
    this.status = resource.status;
    this.name = resource.name;
  }

  setPayload(payload: any) {
    this.payload = payload;
    return this;
  }

  toJson() {
    return {
      id: this.id,
      status: this.status,
      name: this.name,
      message: this.message,
    };
  }
}

export default ContextError;

export const handleError = (
  error: ContextError,
  useError: boolean = false,
  payload: any,
) => {
  if (payload) error.setPayload(payload);
  if (useError) return error;
  throw error;
};
