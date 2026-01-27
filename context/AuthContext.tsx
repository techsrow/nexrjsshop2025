/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getStoredUsername,
  getToken,
  setStoredUsername,
  setToken,
  clearStoredUsername,
  clearToken,
} from "@/lib/storage";

interface AuthContextType {
  username: string | null;
  token: string | null;
  login: (email: string, token: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [username, setUsername] = useState<string | null>(null);
  const [token, setTok] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = getStoredUsername();
    const storedToken = getToken();

    setUsername(storedUser);
    setTok(storedToken);
  }, []);

  const login = (email: string, authToken: string) => {
    setStoredUsername(email);
    setToken(authToken);

    setUsername(email);
    setTok(authToken);
  };

  const logout = () => {
    clearStoredUsername();
    clearToken();

    setUsername(null);
    setTok(null);
  };

  return (
    <AuthContext.Provider value={{ username, token, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
