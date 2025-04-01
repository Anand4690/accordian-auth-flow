
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AuthView = "login" | "signup" | "forgotPassword";

const Auth = () => {
  const [authView, setAuthView] = useState<AuthView>("login");
  const [accordionValue, setAccordionValue] = useState("login");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  
  const handleForgotPassword = () => {
    setAuthView("forgotPassword");
  };
  
  const handleBackToLogin = () => {
    setAuthView("login");
    setAccordionValue("login");
  };

  const renderForm = () => {
    switch (authView) {
      case "login":
        return <LoginForm onForgotPassword={handleForgotPassword} />;
      case "signup":
        return <SignupForm />;
      case "forgotPassword":
        return <ForgotPasswordForm onBackToLogin={handleBackToLogin} />;
      default:
        return <LoginForm onForgotPassword={handleForgotPassword} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {authView === "login" && "Welcome Back"}
            {authView === "signup" && "Create an Account"}
            {authView === "forgotPassword" && "Reset Your Password"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {authView !== "forgotPassword" ? (
            <Accordion
              type="single"
              collapsible
              value={accordionValue}
              onValueChange={(value) => {
                if (value) {
                  setAccordionValue(value);
                  setAuthView(value as AuthView);
                }
              }}
              className="w-full"
            >
              <AccordionItem value="login">
                <AccordionTrigger className="text-lg font-medium">Sign In</AccordionTrigger>
                <AccordionContent>
                  {authView === "login" && renderForm()}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="signup">
                <AccordionTrigger className="text-lg font-medium">Sign Up</AccordionTrigger>
                <AccordionContent>
                  {authView === "signup" && renderForm()}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            renderForm()
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
