import Axios from "@/api/axios";
import { OtpResponse, UserResponse } from "@/models/user";
import { AxiosRequestConfig } from "axios";

export const registerUser = async (
  username: string,
  password: string,
  email: string,
  role?: string
): Promise<UserResponse> => {
  const response = await Axios.post("/api/auth/register", {
    username,
    password,
    email,
    role,
  });
  return response.data as UserResponse;
};

export const loginUser = async (
  username: string,
  password: string,
  loading = true,
  authenticate = false
): Promise<UserResponse> => {
  const response = await Axios.post("/api/auth/login", { username, password }, {
    loading,
    authenticate,
  } as AxiosRequestConfig);
  return response.data as UserResponse;
};

export const sendOtp = async (email: string): Promise<OtpResponse> => {
  const response = await Axios.post("/api/auth/send-otp", { email });
  return response.data as OtpResponse;
};

export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await Axios.get("/api/auth/current-user");
  return response.data as UserResponse;
};
