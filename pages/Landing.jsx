import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Store } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();
    const [hoveredSide, setHoveredSide] = useState(null); 
  
    const wordmark = "sokolink".split("");

    return (
        <div className="relative w-full h-screen overflow-hidden flex flex-col md:flex-row bg-surface">
          
          {/* Absolute Centered Branding */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
            <div className="flex">
              {wordmark.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4, type: "spring" }}
                  className={`text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
                    hoveredSide === 'buyer' ? 'text-coral' : hoveredSide === 'farmer' ? 'text-teal' : 'text-gray-900'
                  }`}
                >
                     {letter}
                 </motion.span>
               ))}
             </div>
             <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5, duration: 0.6 }}
               className="mt-2 text-sm md:text-base text-gray-500 font-medium"
             >
                the marketplace where buyers and sellers marketplace
             </motion.p>
             </div>   