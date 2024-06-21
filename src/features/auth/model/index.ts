import { InferType } from 'yup';
import { loginValidator } from './validators.ts';

export interface LoginRequest extends InferType<typeof loginValidator> {}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: unknown;
  };
}

export type AuthRequest = LoginRequest & {
  [key: string]: string;
};

export type AuthResponse = LoginResponse & {
  [key: string]: unknown;
};
