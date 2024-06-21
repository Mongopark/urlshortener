import { LoginRequest } from './index.ts';

export type AuthField = {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  leftIcon: string;
  rightIcon: string;
};

export const loginFields: AuthField[] = [
  {
    id: 'email',
    label: 'EMAIL ADDRESS',
    placeholder: 'Enter email',
    type: 'email',
    leftIcon: 'fas fa-envelope',
    rightIcon: 'fas fa-envelope'
  },
  {
    id: 'password',
    label: 'CREATE PASSWORD',
    placeholder: 'Enter password',
    type: 'password',
    leftIcon: 'fas fa-eye',
    rightIcon: 'fas fa-eye-slash'
  }
];

export const registerFields: AuthField[] = [
  {
    id: 'email',
    label: 'EMAIL ADDRESS',
    placeholder: 'Enter email',
    type: 'email',
    leftIcon: 'fas fa-envelope',
    rightIcon: 'fas fa-envelope'
  },
  {
    id: 'password',
    label: 'CREATE PASSWORD',
    placeholder: 'Enter password',
    type: 'password',
    leftIcon: 'fas fa-eye',
    rightIcon: 'fas fa-eye-slash'
  },
  {
    id: 'confirm_password',
    label: 'CONFIRM PASSWORD',
    placeholder: 'Enter password',
    type: 'password',
    leftIcon: 'fas fa-eye',
    rightIcon: 'fas fa-eye-slash'
  }
];


export const initialLoginFieldState: LoginRequest = {
  email: '',
  password: ''
};
