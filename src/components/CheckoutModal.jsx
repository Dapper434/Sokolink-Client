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

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-gray-900">Secure Checkout</h2>
                  <span className="bg-teal/10 text-teal text-xs font-semibold px-2 py-1 rounded-full">Secure</span>
                </div>

                <p className="text-gray-600 mb-6 text-sm">
                  You are about to pay <span className="font-bold text-gray-900">KES {totalAmount}</span> via M-Pesa.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    M-Pesa Phone Number
                  </label>
                  <Input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+2547XXXXXXXX"
                    required
                  />
                </div>

                <div>
                    <label className="block text -sm font medium text-gray-700 mb-1.5">
                        Quantity (kg)
                    </label>
                    <Input
                       type="number"
                       min="1"
                       max={maxQuantity}
                       step="0.1"
                       value={quantity}
                       onChange={ (e)=> setQuantity(Number(e.target.value)) }
                       required             
                    />
                     <p className="text-xs text-gray-500 mt-1">Available: {maxQuantity}kg</p>
                </div>
                      









                </div>











        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        </AnimatePresence>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        


























}    