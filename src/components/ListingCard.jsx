import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { ShieldCheck } from 'lucide-react';

const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  const ListingCard = ({ listing, isBuyer, onBuyClick }) => {
    const outOfStock = listing.quantity_kg <= 0;
    const almostOver = listing.quantity_kg > 0 && listing.quantity_kg <= 5;
  
    return (
      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={`bg-surface-card rounded-xl border ${outOfStock ? 'border-gray-200 opacity-75' : 'border-gray-200 hover:border-gray-300'} overflow-hidden transition-colors flex flex-col h-full relative`}
      >

       <div className="relative w-full pb-[56.25%] bg-gray-100">
         <img
           src={listing.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(listing.crop_name)}&background=f0f0f0&color=999`}
           alt={listing.crop_name}
           className={`absolute inset-0 w-full h-full object-cover ${outOfStock ? 'grayscale' : ''}`}
        />

        {outOfStock ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
            <span className="bg-gray-800 text-white font-bold px-4 py-2 rounded-lg shadow-lg rotate-12 uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        ) : almostOver ? (
            <div className="absolute top-2 left-2 bg-amber text-white font-bold px-3 py-1 rounded text-xs shadow-sm">
              Almost over! Only {listing.quantity_kg}kg left
            </div>
          ) : null}
        </div>