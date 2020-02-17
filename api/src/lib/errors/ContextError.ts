import CustomError from './CustomError';

class ContextError extends Error implements CustomError {
  status: number;
  name: string;
  id: string;

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
