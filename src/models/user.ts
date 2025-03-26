// models/user.ts
import { IBaseModel } from "./base";
export interface User {
  a: string; // Role
  e: string; // Name/email
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
  accessToken: string;
  refreshToken: string;
}
export interface Otp {
  otp: string;
  email: string;
}
export type UserResponse = IBaseModel<User>;
export type OtpResponse = IBaseModel<Otp>;

// Define the structure for AuthState
export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
}
