import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import ListingCard from '../components/ListingCard';
import OrderTable from '../components/OrderTable';
import CheckoutModal from '../components/CheckoutModal';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { user } = useAuth();
    const [listings, setListings] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);
    const [quantity, setQuantity] = useState(1);
  
    const myListings = listings.filter(
        (l) => user?.role !== 'farmer' || l.farmer_id === user.id
      );

      const fetchData = async () => {
        setLoading(true);
        try {
            const [listingsRes, ordersRes] = await Promise.all([
              api.get('/listings'),
              api.get('/orders'),
            ]);
            setListings(listingsRes.data);
            setOrders(ordersRes.data);
          } catch {
            toast.error('Failed to load dashboard data');
          } finally {
            setLoading(false);
          }
        };

        useEffect(() => {
            fetchData();
        }, []);


         const openCheckout = (listing) => {
           setSelectedListing(listing);
           setQuantity(1);
           setCheckoutOpen(true);
         };

         const processOrder = async (phoneNumber) => {
            try {
              toast.loading('Initiating secure payment...', { id: 'payment' });
              await api.post('/orders', {
                phone_number: phoneNumber,
                items: [{ listing_id: selectedListing.id, quantity_kg: quantity }],
              });
              setCheckoutOpen(false);
              toast.success('Payment prompt sent to your phone!', { id: 'payment' });
              fetchData();
            } catch (error) {
              toast.error('Checkout failed: ' + (error.response?.data?.message || error.message), { id: 'payment' });
            }
          };

