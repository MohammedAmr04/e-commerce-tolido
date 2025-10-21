import api from "./../../../../lib/axios";

export const authService = {
  register: (data: {
    name: string;
    email: string;
    gender: string;
    password: string;
    phone: string;
    address: string;
  }) => api.post("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),

  forgetPassword: (data: { email: string }) =>
    api.post("/auth/forgot-password", data),

  resetPassword: (data: { email: string; otp: string; newPassword: string }) =>
    api.post("/auth/reset-password", data),
};
