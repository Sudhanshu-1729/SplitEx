import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { login as apiLogin, register as apiRegister, getMe, setAuthToken, clearAuthToken } from '../services/api';
import { useToast } from '@chakra-ui/react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setAuthToken(token);
    const init = async () => {
      try {
        if (!token) return;
        const me = await getMe();
        setUser(me);
      } catch (err) {
        clearAuthToken();
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (email, password) => {
    const { token, user } = await apiLogin(email, password);
    localStorage.setItem('token', token);
    setAuthToken(token);
    setUser(user);
    toast({ title: 'Logged in', status: 'success', duration: 2000 });
    return user;
  };

  const register = async (email, password, name) => {
    const { token, user } = await apiRegister(email, password, name);
    localStorage.setItem('token', token);
    setAuthToken(token);
    setUser(user);
    toast({ title: 'Account created', status: 'success', duration: 2000 });
    return user;
  };

  const logout = () => {
    clearAuthToken();
    localStorage.removeItem('token');
    setUser(null);
    toast({ title: 'Logged out', status: 'info', duration: 1500 });
  };

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
