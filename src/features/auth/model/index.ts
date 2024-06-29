import { InferType } from 'yup';
import { loginValidator } from './validators.ts';

export interface LoginRequest extends InferType<typeof loginValidator> {}

export interface LoginResponse {
  success?: boolean;
  message?: string;
  token?: string;
  data?: {
    id: string;
    name: string;
    email: string;
  };
}


export interface RegisterResponse {
  token: string;
  message: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}


export type AuthRequest = LoginRequest & {
  [key: string]: string;
};


export interface ShortnerRequest {
  name: string;
      original: string;
      description: string;
      user_id: string;
}



export type AuthResponse = LoginResponse & {
  [key: string]: unknown;
};
