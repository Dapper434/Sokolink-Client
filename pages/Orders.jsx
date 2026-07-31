import { useEffect, useState } from 'react';
import api from '../src/services/api';
import OrderTable from '../src/components/OrderTable';
import { useAuth } from '../src/context/AuthContext';

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

    useEffect(() => {
      fetchOrders();
    }, []);
    
    if (loading) {
      return <div className="text-center py-12 text-slate-500">Loading orders...</div>;
    }


    return (
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        <div className="border-b border-slate-200 pb-5">
          <h2 className="text-3xl font-bold leading-7 text-slate-900">Orders</h2>
          <p className="mt-2 max-w-4xl text-sm text-slate-500">
            {user?.role === 'farmer' ? 'Orders placed by buyers for your produce.' : 'Your order history.'}
          </p>
        </div>

        <OrderTable
          orders={orders}
          isFarmer={user?.role === 'farmer'}
          onStatusChange={fetchOrders}
        />
      </div>
  ); 
}








