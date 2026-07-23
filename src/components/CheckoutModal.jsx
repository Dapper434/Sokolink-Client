import React, {useState} from 'react'
import { motion, AnimatedPresence } from 'framer-motion'
import Button from './ui/Button';
import Input from './ui/Input';

const CheckoutModal = ({isOpen, onClose, onConfirm, totalAmount, quantity, setQuantity, maxQuantity}) => {
    const [phomeNumber, setPhoneNumber] = useState('+254700000000');

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(phoneNumber);
    };

    return (
        <AnimatePresence>
            {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md bg-surface-card rounded-[12px] shadow-xl border border-gray-100 overflow-hidden"
            >











        </AnimatePresence>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        


























}    