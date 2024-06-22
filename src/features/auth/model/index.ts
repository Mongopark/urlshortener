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

export type AuthRequest = LoginRequest & {
  [key: string]: string;
};

export type AuthResponse = LoginResponse & {
  [key: string]: unknown;
};
