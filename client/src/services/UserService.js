import service from "@/services/Service"

export default {
  signup(credentials) {
    return service.post("/api/users", credentials)
  },
  getUser(id) {
    return service.get(`/api/users/${id}`)
  },
  updateUser(user) {
    return service.put(`/api/users/${user._id}`, user)
  },
  createCollection(payload) {
    return service.post("/api/collections", payload)
  }
}