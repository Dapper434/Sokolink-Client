import { useEffect, useState } from 'react';
import api from '../services/api';
import OrderTable from '../components/OrderTable';
import { useAuth } from '../context/AuthContext';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
}