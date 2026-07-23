import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Home, Package, PlusCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavItem = ({ icon: Icon, label, isActive, onClick, isPrimary }) =>{
    if (isPrimary) {
        return (
           <motion.button
             whileHove={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={onClick}
             className="flex flex-col items-center justify-center -mt-6 sm:mt-0"
           >

             <div className="bg-coral text-white p-4 rounded-full shadow-lg flex items-center gap-2 sm:px-6 sm:py-3 sm:rounded-lg sm:w-full">
               <Icon className="w-6 h-6 sm:w-5 sm:h-5" />
               <span className="hidden sm:block font-medium">Add Listing</span>
             </div>
           </motion.button>
        );
    }


    return (
    <button 
      onClick={onClick}
      className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-3 p-2 sm:px-4 sm:py-3 rounded-lg transition-colors sm:w-full sm:justify-start ${
        isActive ? 'text-teal sm:bg-teal/10 font-semibold' : 'text-gray-500 hover:text-gray-900 sm:hover:bg-gray-100'
      }`}
    >
      <Icon className="w-6 h-6 sm:w-5 sm:h-5" />
      <span className="text-xs sm:text-sm">{label}</span>
    </button>
  );
};

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    // No user, just render children (for Login/Register pages)
    if (!user) return <>{children}</>;
  
    const isFarmer = user.role === 'farmer';
  










