import axios from 'axios';

import env from '@/consts/env';

const protocol = env.DEV ? 'http' : 'https';
const apiHost = env.API_HOST;
const apiPort = env.API_PORT;
const baseUrl = `${protocol}://${apiHost}:${apiPort}/api`;

const methods = {
  GET: 'GET',
  DELETE: 'DELETE',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
};
const methodTypes = [
  { method: methods.GET, hasBody: false },
  { method: methods.DELETE, hasBody: false },
  { method: methods.POST, hasBody: true },
  { method: methods.PUT, hasBody: true },
  { method: methods.PATCH, hasBody: true },
];

class Service {
  static baseUrl = baseUrl;
  static methods = methods;

  base(path, method = 'GET', data, options) {
    const methodType = this.getMethodType(method);
    this.validateOnBase(path, methodType);
    return this.request(path, methodType, data, options);
  }

  getMethodType(method) {
    if (!method || typeof method !== 'string') return null;
    return methodTypes.find(type => type.method === method.toUpperCase());
  }

  validateOnBase(path, methodType) {
    if (path === null || path === undefined || !methodType) {
      throw new Error('Invalid path or method on service.');
    }
  }

  request(path, methodType, data, options) {
    const url = Service.baseUrl + path;
    const method = methodType.method;
    const dataKey = methodType.hasBody ? 'data' : 'params';

    const config = {
      url,
      method,
      [dataKey]: data,
      responseType: 'json',
      ...options,
    };

    return axios(config).catch(this.onError);
  }

  onError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    return { error };
  }

  constructor(path) {
    this.path = path; // path: '/user'
  }

  validateId(id) {
    if (id === undefined || id === null || id === '') {
      throw new Error('Invalid target ID.');
    }
  }

  create(data, options) {
    const path = this.path;
    return this.base(path, methods.POST, data, options);
  }

  replace(id, data, options) {
    this.validateId(id);
    const path = `${this.path}/${id}`;
    return this.base(path, methods.PUT, data, options);
  }

  update(id, data, options) {
    this.validateId(id);
    const path = `${this.path}/${id}`;
    return this.base(path, methods.PATCH, data, options);
  }

  list(params, options) {
    const path = this.path;
    return this.base(path, methods.GET, params, options);
  }

  retrieve(id, params, options) {
    this.validateId(id);
    const path = `${this.path}/${id}`;
    return this.base(path, methods.GET, params, options);
  }

  destroy(id, params, options) {
    this.validateId(id);
    const path = `${this.path}/${id}`;
    return this.base(path, methods.DELETE, params, options);
  }
}

export default Service;
