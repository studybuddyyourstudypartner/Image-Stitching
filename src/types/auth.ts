export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}