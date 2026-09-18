import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USER: User = {
  name: 'Sarah Ahmed',
  email: 'sarah.ahmed@school.edu',
  role: 'Teacher',
  avatar: 'SA',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('teachai_auth');
    return stored ? MOCK_USER : null;
  });

  const login = async (email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 800));
    const u = { ...MOCK_USER, email };
    setUser(u);
    localStorage.setItem('teachai_auth', '1');
  };

  const register = async (name: string, email: string) => {
    await new Promise(r => setTimeout(r, 800));
    const u = { ...MOCK_USER, name, email };
    setUser(u);
    localStorage.setItem('teachai_auth', '1');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('teachai_auth');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
