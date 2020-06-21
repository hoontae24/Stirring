import axios from 'axios';

import env from '@/consts/env';
import { getApiBaseUrl } from '@/utils';
import tokenStore from '@/stores/token';

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
  static baseUrl = getApiBaseUrl();
  static methods = methods;

  base(path, method = 'GET', data, options) {
    const methodType = this.getMethodType(method);
    this.validateOnBase(path, methodType);
    return this.request(path, methodType, data, options);
  }

  getMethodType(method) {
    if (!method || typeof method !== 'string') return null;
    return methodTypes.find(
      (type) => type.method === method.toUpperCase(),
    );
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

    return axios(config)
      .then(this.onSuccess)
      .catch(this.onError);
  }

  onSuccess(res) {
    return res.data;
  }

  onError(error) {
    const result = error?.response?.data?.error || {};
    if (env.DEV) {
      console.error(result.message);
      // console.log('Response', error.response);
      // console.log('Request', error.request);
      // console.log('Error', error.message);
      // console.log('Config', error.config);
    }
    return { error: result, message: result.message };
  }

  constructor(path) {
    this.path = path; // path: '/user'
  }

  validateId(id) {
    if (id === undefined || id === null || id === '') {
      throw new Error(
        `Invalid parameter: "${id === '' ? 'blank' : String(id)}"`,
      );
    }
    return this;
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

axios.interceptors.request.use((config) => {
  config.headers[env.ACCESS_TOKEN_KEY] = tokenStore.getToken();
  return config;
});

axios.interceptors.response.use((response) => {
  tokenStore.setToken(response.headers[env.ACCESS_TOKEN_KEY]);
  return response;
});
