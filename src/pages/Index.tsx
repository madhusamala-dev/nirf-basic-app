import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './Login';
import Dashboard from './Dashboard';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Dashboard /> : <Login />;
};

export default Index;