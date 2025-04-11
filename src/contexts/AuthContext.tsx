
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name?: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('grit_token');
    const storedUser = localStorage.getItem('grit_user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        // Clear invalid data
        localStorage.removeItem('grit_token');
        localStorage.removeItem('grit_user');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // This would be replaced with actual API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful login
        const newUser = { email };
        setUser(newUser);
        
        // Store user info in localStorage
        localStorage.setItem('grit_token', 'mock_token_' + Date.now());
        localStorage.setItem('grit_user', JSON.stringify(newUser));
        
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // This would be replaced with actual API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful signup
        const newUser = { name, email };
        setUser(newUser);
        
        // Store user info in localStorage
        localStorage.setItem('grit_token', 'mock_token_' + Date.now());
        localStorage.setItem('grit_user', JSON.stringify(newUser));
        
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    // Clear user data from state and localStorage
    setUser(null);
    localStorage.removeItem('grit_token');
    localStorage.removeItem('grit_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
