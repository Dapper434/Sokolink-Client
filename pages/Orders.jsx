import { useEffect, useState } from 'react';
import api from '../services/api';
import OrderTable from '../components/OrderTable';
import { useAuth } from '../context/AuthContext';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };  








}