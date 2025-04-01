
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API base URL
const API_URL = "http://localhost:5000/api";

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing token on mount
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } else {
      // Auto-set test user for convenience
      const testUser = {
        id: "test-user-id",
        name: "Test User",
        email: "abc@gmail.com"
      };
      setUser(testUser);
      localStorage.setItem("token", "fake-test-token");
      localStorage.setItem("user", JSON.stringify(testUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // For our test account, bypass API call
      if (email === 'abc@gmail.com' && password === '12345678') {
        const testUser = {
          id: "test-user-id",
          name: "Test User",
          email: "abc@gmail.com"
        };
        
        // Set token and user in local storage
        localStorage.setItem("token", "fake-test-token");
        localStorage.setItem("user", JSON.stringify(testUser));
        
        setUser(testUser);
        toast.success("Logged in successfully");
        return true;
      }
      
      // Regular login flow (for non-test accounts)
      const response = await api.post("/auth/login", { email, password });
      
      // Set token and user in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      setUser(response.data.user);
      toast.success("Logged in successfully");
      return true;
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await api.post("/auth/register", { name, email, password });
      
      toast.success("Verification code sent to your email");
      return true;
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await api.post("/auth/verify-otp", { email, otp });
      
      toast.success("Email verified successfully");
      return true;
    } catch (error: any) {
      console.error("OTP verification error:", error);
      toast.error(error.response?.data?.message || "Verification failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await api.post("/auth/request-reset", { email });
      
      toast.success("Reset code sent to your email");
      return true;
    } catch (error: any) {
      console.error("Password reset request error:", error);
      toast.error(error.response?.data?.message || "Failed to send reset code. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string, otp: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await api.post("/auth/reset-password", { email, otp, newPassword });
      
      toast.success("Password reset successful");
      return true;
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast.error(error.response?.data?.message || "Password reset failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        verifyOtp,
        requestPasswordReset,
        resetPassword,
        logout
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
