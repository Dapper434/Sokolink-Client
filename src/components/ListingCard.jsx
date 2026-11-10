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
           loading="lazy"
           decoding="async"
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


         <div className="p-4 flex flex-col flex-1">
           <div className="flex justify-between items-start mb-2">
             <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">{listing.crop_name}</h3>
             <span className={`text-lg font-bold shrink-0 ${outOfStock ? 'text-gray-400' : 'text-coral'}`}>
               KES {listing.price_per_kg}/kg
             </span>
            </div>

             <div className="flex items-center gap-1 mb-2">
               <span className="text-xs font-medium text-gray-600">Sold by {listing.farmer_name || 'Verified Farmer'}</span>
               <ShieldCheck size={14} className="text-teal" />
             </div>

             <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
          {listing.description || 'Fresh produce straight from the farm.'}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className={`text-sm font-medium ${outOfStock ? 'text-red-500 font-bold' : 'text-gray-600'}`}>
            {outOfStock ? 'Sold Out' : `${listing.quantity_kg}kg available`}
          </div>

          {isBuyer && (
            <Button variant="primary" onClick={onBuyClick} disabled={outOfStock} className="px-4 py-2 text-sm min-h-[36px]">
              Buy Now
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ListingCard;



