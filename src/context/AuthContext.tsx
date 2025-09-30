import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, College, CollegeCategory } from '../lib/types';

interface AuthContextType extends AuthState {
  login: (collegeName: string, category: CollegeCategory) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    college: null
  });

  const login = (collegeName: string, category: CollegeCategory) => {
    const college: College = {
      id: Date.now().toString(),
      name: collegeName,
      category
    };
    setAuthState({
      isAuthenticated: true,
      college
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      college: null
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
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