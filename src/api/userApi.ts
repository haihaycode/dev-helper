import Axios from "@/api/axios";
import { OtpResponse, UserResponse } from "@/models/user";
import { AxiosRequestConfig } from "axios";
import { getPath, api } from "./config";
export const registerUser = async (
  username: string,
  password: string,
  email: string,
  role?: string
): Promise<UserResponse> => {
  const response = await Axios.post(getPath(api.auth.user.register), {
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
  const response = await Axios.post(
    getPath(api.auth.user.login),
    { username, password },
    {
      loading,
      authenticate,
    } as AxiosRequestConfig
  );
  return response.data as UserResponse;
};

export const sendOtp = async (email: string): Promise<OtpResponse> => {
  const response = await Axios.post(getPath(api.auth.user.sendOtp), { email });
  return response.data as OtpResponse;
};

export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await Axios.get(getPath(api.auth.user.getCurrentUser));
  return response.data as UserResponse;
};
