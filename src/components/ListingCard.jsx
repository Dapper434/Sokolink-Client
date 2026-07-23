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