import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "./../../../../lib/axios";

export interface User {
  _id: string;
  name: string;
  email: string;
  gender: string;
  role: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  status: "SUCCESS" | "FAIL" | string;
  message: string;
  data?: T;
}

export interface ErrorResponse {
  status: "FAIL" | string;
  message: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgetPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  otp: string;
  newPassword: string;
}

export interface RegisterResponse {
  data: {
    user: User;
    token: string;
  };
}

export interface LoginResponse {
  data: {
    user: User;
    token: string;
  };
}

// 🔐 Register
export function useRegisterMutation() {
  return useMutation<
    ApiResponse<RegisterResponse>, // ✅ نوع الـ Response
    AxiosError<ErrorResponse>, // ✅ نوع الخطأ
    RegisterData // ✅ نوع البيانات اللي بنبعتها
  >({
    mutationFn: (data) => api.post("/auth/register", data),
    onSuccess: (res) => {
      const token = res.data?.data?.token;
      const username = res.data?.data?.user.name;
      if (username) localStorage.setItem("username", username);
      if (token) localStorage.setItem("token", token);
      window.dispatchEvent(new Event("storage"));
    },
  });
}

// 🔑 Login
export function useLoginMutation() {
  return useMutation<
    ApiResponse<LoginResponse>,
    AxiosError<ErrorResponse>,
    LoginData
  >({
    mutationFn: (data) => api.post("/auth/login", data),
    onSuccess: (res) => {
      console.log("Login successful, response:", res);
      const token = res.data?.data?.token;
      const username = res.data?.data?.user.name;
      if (username) localStorage.setItem("username", username);
      if (token) localStorage.setItem("token", token);
      window.dispatchEvent(new Event("storage")); // 🔥 يجبر كل الكومبوننتات تعيد التشيك
    },
    onError: (error) => {
      console.error(error.response?.data?.message || "Login failed!");
    },
  });
}

// 🔄 Forgot Password
export function useForgetPasswordMutation() {
  return useMutation<
    ApiResponse<null>,
    AxiosError<ErrorResponse>,
    ForgetPasswordData
  >({
    mutationFn: (data) => api.post("/auth/forgot-password", data),
  });
}

// 🔁 Reset Password
export function useResetPasswordMutation() {
  return useMutation<
    ApiResponse<null>,
    AxiosError<ErrorResponse>,
    ResetPasswordData
  >({
    mutationFn: (data) => api.post("/auth/reset-password", data),
  });
}
