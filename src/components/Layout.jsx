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











}