// models/user.ts
// Define the structure for the User object
import { BaseModel } from "./base";
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
export type UserResponse = BaseModel<User>;

// Define the structure for AuthState
export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
}
