import service from "@/services/Service"

export default {
  login(credentials) {
    return service.post("/api/auth/login", credentials)
  },
  check() {
    return service.get("/api/auth/check")
  },
  refresh(token) {
    return service.get("/api/auth/refresh", null, token)
  }
}
