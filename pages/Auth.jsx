import React, { useState, useContext, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../src/context/AuthContext';
import { ShieldCheck, Loader2 } from 'lucide-react';
import Input from '../src/components/ui/Input';
import useMediaQuery from '../src/hooks/useMediaQuery';

const POSTER = '/media/signin-poster.jpg';

// Background: looping muted drone clip on desktop; poster still only on
// mobile (<768px) or when the user prefers reduced motion.
const AuthBackdrop = () => {
    const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    const isMobile = useMediaQuery('(max-width: 767px)');
    const showVideo = !reduceMotion && !isMobile;
    const videoRef = useRef(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!showVideo) return undefined;
        const onVisibility = () => {
            const v = videoRef.current;
            if (!v) return;
            if (document.hidden) v.pause();
            else v.play().catch(() => {});
        };
        document.addEventListener('visibilitychange', onVisibility);
        return () => document.removeEventListener('visibilitychange', onVisibility);
    }, [showVideo]);

    return (
        <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-gray-900">
          <img src={POSTER} alt="" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          {showVideo && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={POSTER}
              onLoadedData={() => setReady(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[600ms] ease-out ${ready ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src="/media/signin-fields.webm" type="video/webm" />
              <source src="/media/signin-fields-web.mp4" type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/10 to-transparent md:bg-linear-to-r md:from-black/30 md:via-black/5 md:to-transparent" />
        </div>
    );
};

const Auth = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { login, register } = useContext(AuthContext);

    const role = searchParams.get('role') === 'farmer' ? 'farmer' : 'buyer';
    const [mode, setMode] = useState(searchParams.get('mode') === 'register' ? 'register' : 'login');
    const [formData, setFormData] = useState({ name: '', email: '', password: ''});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // "-strong" shades keep white/small text at >= 4.5:1 contrast
    const themeText = role === 'farmer' ? 'text-teal-strong' : 'text-coral-strong';
    const themeBorder = role === 'farmer' ? 'border-teal' : 'border-coral';
    const themeBg = role === 'farmer' ? 'bg-teal-strong' : 'bg-coral-strong';

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
        <main className="relative isolate min-h-svh w-full flex items-center justify-center md:justify-start px-4 py-10 sm:px-6 md:pl-[8vw] lg:pl-[10vw]">
          <AuthBackdrop />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="relative z-10 w-full max-w-[420px] md:w-1/3 md:min-w-[400px]"
          >
            <div className="bg-white/80 backdrop-blur-xl py-8 px-5 shadow-2xl rounded-2xl sm:px-10 border border-white/60">
              <div className="text-center mb-6">
                <h1 className={`text-4xl font-extrabold tracking-tight ${themeText}`}>sokolink</h1>
                <p className="mt-1 text-sm text-gray-700 font-medium">buy and sell, safely.</p>
              </div>
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex-1 py-3 text-sm font-semibold transition-colors duration-200 ${
                    mode === 'login' ? `${themeText} border-b-2 ${themeBorder}` : 'text-gray-600 hover:text-gray-800 border-b-2 border-transparent'
                  }`}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`flex-1 py-3 text-sm font-semibold transition-colors duration-200 ${
                    mode === 'register' ? `${themeText} border-b-2 ${themeBorder}` : 'text-gray-600 hover:text-gray-800 border-b-2 border-transparent'
                  }`}
                >
                  Sign up
                </button>
              </div>
    
              <form className="space-y-5" onSubmit={handleSubmit}>
                {error && (
                  <div role="alert" className="text-sm text-[#B42318] bg-[#E24B4A]/10 p-3 rounded-lg border border-[#E24B4A]/20">
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
                        <label htmlFor="auth-name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <Input id="auth-name" type="text" name="name" autoComplete="name" required value={formData.name} onChange={handleChange} />
                      </div>
                    )}
    
                    <div className="space-y-1">
                      <label htmlFor="auth-email" className="block text-sm font-medium text-gray-700">Email address</label>
                      <Input id="auth-email" type="email" name="email" autoComplete="email" required value={formData.email} onChange={handleChange} />
                    </div>
    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label htmlFor="auth-password" className="block text-sm font-medium text-gray-700">Password</label>
                        {mode === 'login' && (
                          <a href="#" className={`text-xs font-semibold ${themeText} hover:opacity-80`}>
                            Forgot password?
                          </a>
                        )}
                      </div>
                      <Input id="auth-password" type="password" name="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required value={formData.password} onChange={handleChange} />
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
                    className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white ${themeBg} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 ${role === 'farmer' ? 'focus:ring-teal' : 'focus:ring-coral'} transition-all min-h-[44px]`}
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
    
                <div className="flex items-center justify-center gap-1.5 mt-4">
                  <ShieldCheck size={14} className="text-teal-strong" />
                  <span className="text-xs font-medium text-teal-strong">your data is secure</span>
                </div>
              </form>
            </div>
          </motion.div>
        </main>
      );
    };
    
    export default Auth;
