'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Role = 'super admin' | 'admin order' | 'admin stok' | 'admin mesin';

export type User = {
  id: string;
  name: string;
  roles: Role[];
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Optional: restore from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      const set = async () => {
        setUser(JSON.parse(storedUser));
      };
      set();
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('auth_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
