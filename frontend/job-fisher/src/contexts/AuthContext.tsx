import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authService } from "../services/auth";
import type { User, AuthState } from "../types";

export interface EmailVerifyResponse {
  success: boolean;
  alreadyRegistered?: boolean;
  token?: string;
  message?: string;
}

export interface OtpVerifyResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
  };
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  verifyEmail: (email: string) => Promise<EmailVerifyResponse>;
  otpVerify: (email: string, otp: string) => Promise<OtpVerifyResponse>;
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
    console.log(response);
    setIsAuthenticated(true);
  };

  const verifyEmail = async (email: string) => {
    const response = await authService.emailVerify(email);
    if (response.token) {
      setIsAuthenticated(true);
    }
    console.log(response);
    return response;
  };

  const otpVerify = async (email: string, otp: string) => {
    const response = await authService.otpVerify(email, otp);
    console.log(response);
    if (response.token) {
      setIsAuthenticated(true);
    }
    return response;
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
        verifyEmail,
        otpVerify,
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
