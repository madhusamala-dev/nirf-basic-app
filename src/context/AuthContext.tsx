import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'admin' | 'coordinator';
  college: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin1',
    name: 'Admin User',
    email: 'admin@iitdelhi.ac.in',
    role: 'admin',
    college: 'IIT Delhi'
  },
  {
    id: '2',
    username: 'coord1',
    name: 'Dr. Rajesh Kumar',
    email: 'coordinator@iitdelhi.ac.in',
    role: 'coordinator',
    college: 'IIT Delhi'
  },
  {
    id: '3',
    username: 'admin2',
    name: 'Admin User 2',
    email: 'admin@iitbombay.ac.in',
    role: 'admin',
    college: 'IIT Bombay'
  },
  {
    id: '4',
    username: 'coord2',
    name: 'Dr. Priya Sharma',
    email: 'coordinator@iitbombay.ac.in',
    role: 'coordinator',
    college: 'IIT Bombay'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('nirf-auth-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('nirf-auth-user');
      }
    }
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('nirf-auth-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nirf-auth-user');
    }
  }, [user]);

  const login = (username: string, password: string): boolean => {
    // Simple demo authentication - in real app, this would be secure
    if (password === 'demo123') {
      const foundUser = mockUsers.find(u => u.username === username);
      if (foundUser) {
        setUser(foundUser);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};