export type UserRole = 'admin' | 'customer' | 'guest';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  role: UserRole;
  isLoading: boolean;
  isGuest: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  continueAsGuest: () => void;
  promptSignIn: () => void;
}
