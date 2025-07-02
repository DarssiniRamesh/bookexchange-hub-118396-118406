import React, { createContext, useContext, useState, useEffect } from "react";
import * as api from '../utils/api';

const AuthContext = createContext();

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("bs_user");
    return u ? JSON.parse(u) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("bs_token") || null);

  useEffect(() => {
    if (user) localStorage.setItem("bs_user", JSON.stringify(user));
    else localStorage.removeItem("bs_user");
    if (token) localStorage.setItem("bs_token", token);
    else localStorage.removeItem("bs_token");
  }, [user, token]);

  // PUBLIC_INTERFACE
  async function login(username, password) {
    const resp = await api.login(username, password);
    if (resp && resp.access_token) {
      setUser({ username });
      setToken(resp.access_token);
      return true;
    }
    return false;
  }

  // PUBLIC_INTERFACE
  async function signup(username, password) {
    const resp = await api.signup(username, password);
    if (resp && resp.success) {
      return await login(username, password);
    }
    return false;
  }

  // PUBLIC_INTERFACE
  function logout() {
    setUser(null);
    setToken(null);
  }

  // PUBLIC_INTERFACE
  function getToken() {
    return token;
  }

  // PUBLIC_INTERFACE
  function isAuthenticated() {
    return !!token;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, getToken, isAuthenticated, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
