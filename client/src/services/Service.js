import axios from 'axios'
import { apiAddress, apiPort } from '@/config'
import store from '@/store'

export default {
  get: (url, payload, token = store.state.userInfo.token) => {
    return axios({
      url,
      method: 'get',
      baseURL: `http://${apiAddress}:${apiPort}/`,
      headers: { 'x-access-token': token },
      params: payload
    })
  },
  post: (url, payload, token = store.state.userInfo.token) => {
    const headers = { 'x-access-token': token }
    return axios({
      url,
      method: 'post',
      baseURL: `http://${apiAddress}:${apiPort}/`,
      headers,
      data: payload
    })
  },
  put: (url, payload, token = store.state.userInfo.token) => {
    return axios({
      url,
      method: 'put',
      baseURL: `http://${apiAddress}:${apiPort}/`,
      headers: { 'x-access-token': token },
      data: payload
    })
  },
  delete: (url, payload, token = store.state.userInfo.token) => {
    return axios({
      url,
      method: 'delete',
      baseURL: `http://${apiAddress}:${apiPort}/`,
      headers: { 'x-access-token': token },
      data: payload
    })
  }
}
