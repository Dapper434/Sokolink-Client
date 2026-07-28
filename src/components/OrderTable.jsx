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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            {/*Left Side: Order Info */}

            <div className="flex-1 space-y-1">
              <div className="flex items-centre gap-3">
                <span className="font-semibold text-gray-900">Order #{order.id}</span>
                {getStatusBadge(order.status)}
                
              </div>
              <p className="text-sm text-gray-500">
                {new Date(order.order_date).toLocaleDateString(undefined, {
                  month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </p>
              {isFarmer && (
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium text-gray-600 mt-2">Buyer:</span> {order.buyer_name} ({order.phone_number})
                </p>
              )
              }
            </div>

            {/* Right side: Items and Price */}
            <div className="flex flex-col sm:items-end gap-2">
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">KES {order.total_amount}</span>
              </div>
              <div className="text-sm text-gray-500">
                {order.items?.map(i => `${i.quantity_kg}kg ${i.crop_name}`).join(', ')}
              </div>

              {/* Farmer Actions */}
              {isFarmer && order.status !== 'fulfilled'&& (
                 <div className="mt-2 flex gap-s">
                    <button
                       onClick={() => updateStatus(order.id, 'fulfilled')}
                       className="text-xs font-medium text-teal hover:text-teal/80 px-3 py-1.5 bg teal/5 rounded-lg transition-colors"
                    >
                      Mark Fulfilled
                      
                      
                      </button>   




            </div>

































































          </div>


























        </motion.div> 

  )


   


  }