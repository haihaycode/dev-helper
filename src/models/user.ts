// models/user.ts
// Define the structure for the User object
export interface User {
  a: string; // Role
  e: string; // Name/email
}

// Define the structure for AuthState
export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
}
