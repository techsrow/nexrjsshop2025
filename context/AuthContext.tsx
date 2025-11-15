/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext, useState, useEffect } from "react";

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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUsername(storedUser);
      setToken(storedToken);
    }
  }, []);

  const login = (email: string, authToken: string) => {
    localStorage.setItem("username", email);
    localStorage.setItem("token", authToken);

    setUsername(email);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    setUsername(null);
    setToken(null);
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
