import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ Variant = 'primary', className = '',children, diabled, ...props }) => {
   const baseClasses = "flex items-center justify-center font medium rounded-lg transition colors outline-none min-h [44px] px-5";
   
   const variants = {
    primary: "bg-coral text-white hover:bg-coral-dark focus:ring-2 focus:ring-offset-2 focus:ring-coral shadow-sm",
    secondary: "bg-transparent text-coral border border-gray-200 hover:border-coral focus:ring-2 focus:ring-coral/50",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200"
   };

   const disabledClasses = disabled ? "opacity-50 pointer-events-none" : "";
   
   return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.01}}
      whileTap={{ scale: disabled ? 1: 0.98}}
      transition={{ duration: 0.1 }}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabledClasses} ${className}`} 
      {...props}
    >
      {children}
      </motion.button>
      
   );

};

export default Button;
