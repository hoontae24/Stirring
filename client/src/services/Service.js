import axios from 'axios'
import { apiAddress, apiPort } from '@/config'

export default {
  get: (url, params, token) => {
    return axios
      .create({
        baseURL: `http://${apiAddress}:${apiPort}/`
      })
      .get(url, {
        headers: { 'x-access-token': token },
        params
      })
  },
  post: (url, payload) => {
    return axios
      .create({
        baseURL: `http://${apiAddress}:${apiPort}/`
      })
      .post(url, payload)
  },
  put: (url, payload) => {
    return axios
      .create({
        baseURL: `http://${apiAddress}:${apiPort}/`
      })
      .put(url, payload)
  },
  delete: (url, payload) => {
    return axios
      .create({
        baseURL: `http://${apiAddress}:${apiPort}/`
      })
      .delete(url, payload)
  }
}
