import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authService } from "../services/auth";
import type { User, AuthState } from "../types";

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem("auth_token");
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    setUser(response.user);
    setIsAuthenticated(true);
  };

  const signUp = async (email: string, password: string) => {
    const response = await authService.signUp(email, password);
    setUser(response.user);
    setIsAuthenticated(true);
  };

  const signOut = () => {
    authService.signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
