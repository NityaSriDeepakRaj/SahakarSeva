'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { DEMO_USERS } from '@/lib/data';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password?: string) => Promise<boolean>;
  loginAsDemo: (roleKey: 'worker' | 'customer' | 'admin' | 'business') => void;
  signup: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage or cookies on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sahakar_auth_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error reading auth state', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUserSession = (userData: User) => {
    setUser(userData);
    localStorage.setItem('sahakar_auth_user', JSON.stringify(userData));
    // Set a lightweight cookie for client/server route checks
    document.cookie = `sahakar_token=active_session_${userData.role}; path=/; max-age=86400; SameSite=Lax`;
  };

  const login = async (identifier: string, _password?: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Check if identifier matches any demo user
    const matchedRole = Object.keys(DEMO_USERS).find((key) => {
      const u = DEMO_USERS[key];
      return u.email.toLowerCase() === identifier.toLowerCase() || u.phone.includes(identifier);
    });

    if (matchedRole) {
      saveUserSession(DEMO_USERS[matchedRole]);
      setIsLoading(false);
      return true;
    }

    // Default fallback mock login if user enters custom credentials
    const customUser: User = {
      id: `usr-${Date.now()}`,
      email: identifier.includes('@') ? identifier : `${identifier}@sahakarseva.org`,
      phone: identifier.includes('@') ? '+91 98765 00000' : identifier,
      fullName: 'Registered Member',
      role: 'customer',
      city: 'New Delhi',
      verifiedEmail: true,
      verifiedPhone: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    saveUserSession(customUser);
    setIsLoading(false);
    return true;
  };

  const loginAsDemo = (roleKey: 'worker' | 'customer' | 'admin' | 'business') => {
    const demo = DEMO_USERS[roleKey] || DEMO_USERS.worker;
    saveUserSession(demo);
    router.push('/dashboard');
  };

  const signup = async (userData: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newUser: User = {
      id: `usr-${Date.now()}`,
      email: userData.email || 'member@sahakarseva.org',
      phone: userData.phone || '+91 98765 12345',
      fullName: userData.fullName || 'Cooperative Member',
      role: userData.role || 'worker',
      city: userData.city || 'New Delhi',
      address: userData.address || '',
      verifiedEmail: true,
      verifiedPhone: true,
      cooperativeBranch: userData.role === 'worker' ? 'Delhi Regional Guild' : undefined,
      createdAt: new Date().toISOString().split('T')[0],
    };

    saveUserSession(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sahakar_auth_user');
    document.cookie = 'sahakar_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/');
  };

  const switchRole = (newRole: UserRole) => {
    const matched = Object.values(DEMO_USERS).find((u) => u.role === newRole);
    if (matched) {
      saveUserSession(matched);
    } else if (user) {
      const updated = { ...user, role: newRole };
      saveUserSession(updated);
    }
  };

  const role: UserRole = user?.role || 'customer';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isLoading,
        login,
        loginAsDemo,
        signup,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
