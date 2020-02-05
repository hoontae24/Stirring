import service from "@/services/Service"

export default {
  login(credentials) {
    return service.post("/api/auths/login", credentials)
  },
  check() {
    return service.get("/api/auths/check")
  },
  refresh(token) {
    return service.get("/api/auths/refresh", null, token)
  }
}
