import { api } from "./api";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    if (response.data.token) {
      console.log(response.data.token);
      localStorage.setItem("auth_token", response.data.token);
    }
    return response.data;
  },
  signUp: async (email: string, password: string) => {
    const response = await api.post("/auth/signup", { email, password });
    if (response.data.token) {
      console.log(response.data.token);
      localStorage.setItem("auth_token", response.data.token);
    }
    return response.data;
  },
  signOut: () => {
    localStorage.removeItem("auth_token");
  },
  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};
