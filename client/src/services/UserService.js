import service from "@/services/Service"

export default {
  signup(credentials) {
    return service.post("/api/users", credentials)
  }
}