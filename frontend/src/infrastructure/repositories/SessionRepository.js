import api from "../api/Axios";

export class SessionRepository {
    async getCurrentUser() {
        return await api.get("/session/me");
    }
    async logout() {
        return await api.post("/session/logout");
    }
    async refreshToken() {
        return await api.post("/session/refresh");
    }   
}