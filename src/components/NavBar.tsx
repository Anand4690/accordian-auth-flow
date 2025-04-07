
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

interface NavBarProps {
  showLoginButton?: boolean;
}

const NavBar = ({ showLoginButton = true }: NavBarProps) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-800">
            <a href="/dashboard">CodeLearn</a>
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src={user?.profileImage || undefined} 
                      alt={user?.name || "User"} 
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem disabled>
                    <User className="mr-2 h-4 w-4" />
                    <span>{user?.name}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                    <span className="ml-6">{user?.email}</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            showLoginButton && (
              <Button onClick={handleLogin} variant="outline">
                Log In
              </Button>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
