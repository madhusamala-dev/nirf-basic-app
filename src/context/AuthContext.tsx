import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'coordinator';
  college: {
    name: string;
    category: string;
    location: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'coordinator@iitdelhi.ac.in',
    name: 'Dr. Rajesh Kumar',
    role: 'coordinator',
    college: {
      name: 'Indian Institute of Technology Delhi',
      category: 'Engineering',
      location: 'New Delhi'
    }
  },
  {
    id: '2',
    email: 'coordinator@nit.ac.in',
    name: 'Prof. Priya Sharma',
    role: 'coordinator',
    college: {
      name: 'National Institute of Technology',
      category: 'Engineering',
      location: 'Warangal'
    }
  },
  {
    id: '3',
    email: 'admin@nirf.gov.in',
    name: 'NIRF Administrator',
    role: 'admin',
    college: {
      name: 'NIRF Headquarters',
      category: 'Administrative',
      location: 'New Delhi'
    }
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email (password validation is simplified for demo)
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password.length >= 6) {
      setUser(foundUser);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};