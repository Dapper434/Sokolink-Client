import React, { useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, Loader2 } from 'lucide-react';
import input from '../componens/ui/Input;

const Auth = () => {
    const [searchParams, setSearchParams] = useSearchPrams();
    const { login, register } = useContext(AuthContext);

    const role = searchParams.get('role') === 'farmer' ? 'farmer' : 'buyer';
    const [mode, setMode] = useState(searchParams.get('mode') === 'register' ? 'register' : 'login';)
    const [formData, setFormData] = useState({ name: '', email: '', password: ''});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setErro] = useState(null);
    const [success, setSuccess] = useState(false);

    const themeText = role === 'farmer' ? 'text-teal' : 'text-coral';
    const themeBorder = role === 'farmer' ? 'border-teal' : 'border-coral';
    const themeBg = role === 'farmer' ? 'bg-teal' : 'bg-coral';

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const switchRole = () => {
        setSearchParams({ role: role === 'farmer' ? 'buyer' : 'farmer', mode });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            if (mode === 'login') {
              await login(formData.email, formData.password);
            } else {
              await register(formData.name, formData.email, formData.password, role);
            }
            setSuccess(true);
    
  
    





































































































}
 