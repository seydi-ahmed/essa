export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  userId: number;
}