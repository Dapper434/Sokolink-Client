import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();
export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] =  useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    //Keep login state after page refresh 
    useEffect( () => {
        if (token) {
          localStorage.setItem('token', token)  
          const saved = localStorage.getItem('user');
          if (saved) setUser(JSON.parse(saved));
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
    }, [token]);
        
    const login = async (email, password) => {
       const res = await api.post('/auth/login', {email, password}); 
       setToken(res.data.access_token);
       setUser(res.data.user);
       localStorage.setItem('user', JSON.stringify(res.data.user));
       navigate('/dashboard');
    };

    const register = async (name, email, password, role) => {
        await api.post('/auth/register', { name, email, password, role });
        await login(email, password);
      };
    
    const logout = () => {
        setToken(null);
        setUser(null);
        navigate('/')
    };
    
    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
          {children}
        </AuthContext.Provider>
      );
};
    
    
    
    







    
    

    
