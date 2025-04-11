
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LogOut, User } from 'lucide-react';

const AuthHeader = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "Come back soon to continue your eco-investment journey!",
    });
  };

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 bg-secondary/30 text-secondary-foreground px-3 py-1 rounded-full">
            <User className="h-4 w-4" />
            <span className="text-sm font-medium">
              {user?.name || user?.email}
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-1"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      ) : (
        <Button variant="default" size="sm" asChild>
          <Link to="/auth">Log In / Sign Up</Link>
        </Button>
      )}
    </div>
  );
};

export default AuthHeader;
