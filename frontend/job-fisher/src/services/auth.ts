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
  emailVerify: async (email: string) => {
    const response = await api.post("/auth/signup/emailVerify", { email });
    if (response.data.token) {
      console.log(response.data.token);
      localStorage.setItem("auth_token", response.data.token);
    }
    return response.data;
  },
  otpVerify: async (email: string, otp: string) => {
    const response = await api.post("/auth/signup/otpVerify", { email, otp });
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
