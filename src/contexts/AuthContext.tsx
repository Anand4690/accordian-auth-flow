
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock API calls - would be replaced with actual API calls to your MongoDB backend
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (email && password) {
        setUser({
          id: "user123",
          name: "User Name",
          email: email
        });
        toast.success("Logged in successfully");
        return true;
      }
      toast.error("Invalid credentials");
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would create a user in MongoDB
      // and send an OTP via nodemailer
      toast.success("Verification code sent to your email");
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock verification (would validate against OTP stored in MongoDB)
      if (otp === "1234") { // Just for demonstration
        toast.success("Email verified successfully");
        return true;
      }
      toast.error("Invalid verification code");
      return false;
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Verification failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would verify the email exists
      // in MongoDB and send an OTP via nodemailer
      toast.success("Reset code sent to your email");
      return true;
    } catch (error) {
      console.error("Password reset request error:", error);
      toast.error("Failed to send reset code. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string, otp: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock verification and password update
      if (otp === "1234") { // Just for demonstration
        toast.success("Password reset successful");
        return true;
      }
      toast.error("Invalid verification code");
      return false;
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Password reset failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
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
