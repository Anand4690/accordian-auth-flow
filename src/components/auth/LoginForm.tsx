
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LoginForm({ onForgotPassword }: { onForgotPassword: () => void }) {
  const [email, setEmail] = useState("abc@gmail.com");
  const [password, setPassword] = useState("12345678");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/dashboard");
    }
  };

  // Auto-submit for test account
  useEffect(() => {
    // Uncomment this if you want auto-login
    // if (email === 'abc@gmail.com' && password === '12345678') {
    //   handleSubmit(new Event('submit') as any);
    // }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
            Logging in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
      <Button
        type="button"
        variant="link"
        className="w-full mt-2"
        onClick={onForgotPassword}
      >
        Forgot Password?
      </Button>
    </form>
  );
}
