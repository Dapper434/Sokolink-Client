import React, { useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, Loader2 } from 'lucide-react';
import input from '../componens/ui/Input';

const Auth = () => {
    const [searchParams, setSearchParams] = useSearchPrams();
    const { login, register } = useContext(AuthContext);

    const role = searchParams.get('role') === 'farmer' ? 'farmer' : 'buyer';
    const [mode, setMode] = useState(searchParams.get('mode') === 'register' ? 'register' : 'login');
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
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="min-h-screen w-full bg-surface flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="sm:mx-auto sm:w-full sm:max-w-md text-center"
          >
            <h1 className={`text-4xl font-extrabold tracking-tight ${themeText}`}>sokolink</h1>
            <p className="mt-2 text-sm text-gray-500">buy and sell, safely.</p>
          </motion.div>
    
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mt-8 sm:mx-auto sm:w-full sm:max-w-[420px]"
          >
            <div className="bg-surface-card py-8 px-4 shadow-sm sm:rounded-2xl sm:px-10 border border-gray-100">
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex-1 py-3 text-sm font-semibold transition-colors duration-200 ${
                    mode === 'login' ? `${themeText} border-b-2 ${themeBorder}` : 'text-gray-400 hover:text-gray-500 border-b-2 border-transparent'
                  }`}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`flex-1 py-3 text-sm font-semibold transition-colors duration-200 ${
                    mode === 'register' ? `${themeText} border-b-2 ${themeBorder}` : 'text-gray-400 hover:text-gray-500 border-b-2 border-transparent'
                  }`}
                >
                  Sign up
                </button>
              </div>
    
              <form className="space-y-5" onSubmit={handleSubmit}>
                {error && (
                  <div className="text-sm text-[#E24B4A] bg-[#E24B4A]/10 p-3 rounded-lg border border-[#E24B4A]/20">
                    {error}
                  </div>
                )}
    
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, x: mode === 'login' ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: mode === 'login' ? 10 : -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    {mode === 'register' && (
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <Input type="text" name="name" required value={formData.name} onChange={handleChange} />
                      </div>
                    )}
    
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Email address</label>
                      <Input type="email" name="email" required value={formData.email} onChange={handleChange} />
                    </div>
    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        {mode === 'login' && (
                          <a href="#" className={`text-xs font-semibold ${themeText} hover:opacity-80`}>
                            Forgot password?
                          </a>
                        )}
                      </div>
                      <Input type="password" name="password" required value={formData.password} onChange={handleChange} />
                    </div>
    
                    {mode === 'register' && (
                      <div className="pt-1 flex items-center justify-between text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <span>Signing up as a <strong>{role === 'farmer' ? 'Seller' : 'Buyer'}</strong>.</span>
                        <button type="button" onClick={switchRole} className={`${themeText} font-semibold hover:underline`}>
                          Switch to {role === 'farmer' ? 'Buyer' : 'Seller'}
                        </button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
    
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || success}
                    className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white ${themeBg} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 ${mode === 'login' ? 'focus:ring-coral' : 'focus:ring-teal'} transition-all min-h-[44px]`}
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin w-5 h-5" />
                    ) : success ? (
                      <ShieldCheck className="w-5 h-5" />
                    ) : (
                      mode === 'login' ? 'Sign in' : 'Create account'
                    )}
                  </button>
                </div>
    
                <div className="flex items-center justify-center gap-1.5 mt-4 opacity-80">
                  <ShieldCheck size={14} className="text-teal" />
                  <span className="text-xs font-medium text-teal">your data is secure</span>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      );
    };
    
    export default Auth;
    
    
  
    






































































































 