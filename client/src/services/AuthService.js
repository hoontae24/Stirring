import service from "@/services/Service"

export default {
  signup(credentials) {
    return service.post("/api/users", credentials)
  },
  login(credentials) {
    return service.post("/api/auth/login", credentials)
  },
  check(params, token) {
    return service.get("/api/auth/check", params, token)
  },
  refresh(params, token) {
    return service.get("/api/auth/refresh", params, token)
  }
}
