import React, { createContext, useState, useEffect } from 'react';
import api from '..services/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();
export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] =  useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    
}