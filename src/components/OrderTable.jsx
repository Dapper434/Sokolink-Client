import React from 'react';
import { motion } from 'framer-motion';
import Badge from './ui/Badge';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const OrderTable = ({ orders, isFarmer, onStatusChange }) => {
  
  const updateStatus = async (`/orders/${orderId}/status`, {status: newStatus})
  














}
  
    