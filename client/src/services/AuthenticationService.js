import service from "@/services/Service"

export default {
  register(credentials) {
    return service.post("/register", credentials)
  },
  login(credentials) {
    return service.get("/login", credentials)
  }
}
