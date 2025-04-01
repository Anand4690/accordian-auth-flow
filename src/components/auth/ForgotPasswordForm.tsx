
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

type PasswordResetStep = "request" | "verify" | "reset";

export function ForgotPasswordForm({ onBackToLogin }: { onBackToLogin: () => void }) {
  const [step, setStep] = useState<PasswordResetStep>("request");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { requestPasswordReset, resetPassword, isLoading } = useAuth();

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await requestPasswordReset(email);
    if (success) {
      setStep("verify");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp) {
      setStep("reset");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    const success = await resetPassword(email, otp, newPassword);
    if (success) {
      onBackToLogin();
    }
  };

  if (step === "verify") {
    return (
      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp">Verification Code</Label>
          <Input
            id="otp"
            type="text"
            placeholder="Enter the code sent to your email"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <p className="text-sm text-muted-foreground">
            We've sent a verification code to {email}
          </p>
        </div>
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify Code"
          )}
        </Button>
        <Button
          type="button"
          variant="link"
          className="w-full mt-2"
          onClick={() => setStep("request")}
        >
          Back
        </Button>
      </form>
    );
  }

  if (step === "reset") {
    return (
      <form onSubmit={handleResetPassword} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting password...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
        <Button
          type="button"
          variant="link"
          className="w-full mt-2"
          onClick={() => setStep("verify")}
        >
          Back
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleRequestReset} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p className="text-sm text-muted-foreground">
          Enter your email to receive a reset code
        </p>
      </div>
      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Reset Code"
        )}
      </Button>
      <Button
        type="button"
        variant="link"
        className="w-full mt-2"
        onClick={onBackToLogin}
      >
        Back to Login
      </Button>
    </form>
  );
}
