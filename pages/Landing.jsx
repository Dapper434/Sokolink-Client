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

             {/* Buyer Section   */}
             <motion.div
               initial={{ x: '-100%' }}
               animate={{ x: 0 }}
               transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
               onMouseEnter={() => setHoveredSide('buyer')}
               onMouseLeave={() => setHoveredSide(null)}
               onClick={() => navigate('/auth?role=buyer')}
               className={`flex-1 h-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative border-b md:border-b-0 md:border-r border-gray-200
                 ${hoveredSide === 'buyer' ? 'bg-coral/5' : 'bg-transparent hover:bg-gray-50'}`}
             >
                 <motion.div 
                   whileTap={{ scale: 0.98 }}
                   className="flex flex-col items-center gap-4 mt-32 md:mt-48"
                 >
                   <div className={`p-4 rounded-full transition-colors duration-300 ${
                     hoveredSide === 'buyer' ? 'bg-coral/10 text-coral' : 'bg-gray-100 text-gray-400'
                   }`}>

                         <ShoppingBag size={32} />
                         </div>
                         <span className={`text-lg font-semibold transition-colors duration-300 ${
                           hoveredSide === 'buyer' ? 'text-coral' : 'text-gray-500'
                         }`}>
                           I'm buying
                         </span>
                </motion.div>
              </motion.div> 

              {/* Seller Side */}
              <motion.div
                 initial= {{ x: '100%' }}
                 animate={{x: 0 }}
                 transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
                 onMouseEnter={() => setHoveredSide('farmer')}
                 onMouseLeave={() => setHoveredSide(null)}
                 onClick={() => navigate('/auth?role=farmer')}
                 className={`flex-1 h-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative
                    ${hoveredSide === 'farmer' ? 'bg-teal/5' : 'bg-transparent hover:bg-gray-50'}`}
               >

                <motion.div 
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-col items-center gap-4 mt-32 md:mt-48 md:mb-0 mb-16"
                >
                  <div className={`p-4 rounded-full transition-colors duration-300 ${
                    hoveredSide === 'farmer' ? 'bg-teal/10 text-teal' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Store size={32} />
                  </div>
                 
                 
                   