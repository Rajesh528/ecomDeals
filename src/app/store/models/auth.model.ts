export interface User {
  username: string;
  email: string;
   mobile: string;
    password: string
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
export interface NewUser extends User {
  confirmPassword: string;
}