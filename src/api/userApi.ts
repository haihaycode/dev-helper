import Axios from "@/api/axios";
import { UserResponse } from "@/models/user";

export const registerUser = async (
  username: string,
  password: string,
  role?: string
): Promise<UserResponse> => {
  const response = await Axios.post("/api/auth/register", {
    username,
    password,
    role,
  });
  return response.data as UserResponse;
};

export const loginUser = async (
  username: string,
  password: string
): Promise<UserResponse> => {
  const response = await Axios.post("/api/auth/login", { username, password });
  return response.data as UserResponse;
};
