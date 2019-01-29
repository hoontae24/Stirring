import axios from "axios"
import { apiAddress, apiPort } from "@/config"

export default {
  post: (url, payload) => {
    return axios
      .create({
        baseURL: `http://${apiAddress}:${apiPort}/`
      })
      .post(url, payload)
  },
  get: (url, payload) => {
    return axios
      .create({
        baseURL: `http://${apiAddress}:${apiPort}/`
      })
      .get(url, { params: payload })
  }
}
