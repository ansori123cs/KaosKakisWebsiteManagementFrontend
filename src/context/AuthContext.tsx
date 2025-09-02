import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  email: string;
  role: 'admin' | 'user';
  token: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // simulasi login (bisa ganti call API ASP.NET Core)
  const login = async (email: string, password: string) => {
    if (email === 'admin@test.com' && password === '123') {
      setUser({
        id: '1',
        email,
        role: 'admin',
        token: 'jwt-admin',
      });
    } else {
      setUser({
        id: '2',
        email,
        role: 'user',
        token: 'jwt-user',
      });
    }
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus dipakai di dalam AuthProvider');
  }
  return context;
}
