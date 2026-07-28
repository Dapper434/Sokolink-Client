import React from 'react';
import { motion } from 'framer-motion';
import Badge from './ui/Badge';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const OrderTable = ({ orders, isFarmer, onStatusChange }) => {
  
  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus })
      toast.success("Status updated!");
      onStatusChange();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const getStausBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'completed':
        return <Badge variant="teal" icon={CheckCircle2}>Completed</Badge>;
      case 'pending':
        return <Badge variant="amber" icon={Clock}>Pending</Badge>;
      default:
        return <Badge variant="coral" icon={AlertCircle}>{status}</Badge>;  
    } 
  };

  if (!orders || orders.length===0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-surface border-2 border-dashed border-gray-200 rounded-xl">
        No orders found.
      </div>
    );
  }

  return(
    <div className="space-y-4">
      {orders.map((order, i) => (
        <motion.div 
          key={order.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-surface-card border border-gray-200 rounded-xl p-4 sm:p-5 hover:border-gray-300 transition-colors"
      >
  )


   


  }