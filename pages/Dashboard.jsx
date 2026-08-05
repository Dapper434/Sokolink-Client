import React, { useState, useEffect } from 'react';
import { useAuth } from '../src/context/AuthContext';
import api from '../src/services/api';
import ListingCard from '../src/components/ListingCard';
import OrderTable from '../src/components/OrderTable';
import CheckoutModal from '../src/components/CheckoutModal';
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
            const hasToken = !!localStorage.getItem('token');
            const listingsPromise = api.get('/listings').catch((err) => {
              console.error('Failed to load listings:', err);
              return { data: [] };
            });
            const ordersPromise = hasToken
              ? api.get('/orders').catch((err) => {
                  console.error('Failed to load orders:', err);
                  return { data: [] };
                })
              : Promise.resolve({ data: [] });

            const [listingsRes, ordersRes] = await Promise.all([listingsPromise, ordersPromise]);
            setListings(Array.isArray(listingsRes.data) ? listingsRes.data : []);
            setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
          } catch (error) {
            console.error('Dashboard data load error:', error);
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

          return (
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10">
              {/* Dynamic Image Banner */}
              <div 
                className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden bg-cover bg-center flex items-end p-6 sm:p-8 shadow-sm"
                style={{ 
                  backgroundImage: `url(${user?.role === 'farmer' ? '/seller1.jpg' : '/buyer1.jpg'})` 
                }}
              >
                {/* Dark overlay so text is readable */}
                <div className="absolute inset-0 bg-black/40"></div>
                
                <div className="relative z-10 text-white">
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    {user?.role === 'farmer' ? 'Seller Dashboard' : 'Discover'}
                  </h1>
                  <p className="text-sm sm:text-lg opacity-90 mt-2 max-w-2xl font-medium">
                    {user?.role === 'farmer'
                      ? 'Manage your active listings and fulfill orders directly from the farm.'
                      : 'Fresh produce delivered straight from verified local farmers.'}
                  </p>
                </div>
              </div>
        
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {user?.role === 'farmer' ? 'Your Active Listings' : 'Trending Produce'}
                </h2>
        
                {loading ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="bg-surface-card rounded-[12px] border border-gray-100 overflow-hidden h-[280px] flex flex-col">
                        <div className="w-full pb-[56.25%] shimmer" />
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="h-5 w-3/4 shimmer rounded mb-2" />
                            <div className="h-4 w-1/2 shimmer rounded" />
                          </div>
                          <div className="h-9 w-full shimmer rounded mt-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
                  >
                    {myListings.map((listing) => (
                      <ListingCard
                        key={listing.id}
                        listing={listing}
                        isBuyer={user?.role === 'buyer'}
                        onBuyClick={() => openCheckout(listing)}
                      />
                    ))}
        
                    {myListings.length === 0 && (
                      <div className="col-span-full py-12 text-center text-gray-500 bg-surface-card rounded-[12px] border border-gray-200">
                        No produce available right now.
                      </div>
                    )}
                  </motion.div>
                )}
              </section>
        
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {user?.role === 'farmer' ? 'Recent Orders' : 'Your Order History'}
                </h2>
        
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2].map((n) => (
                      <div key={n} className="h-24 w-full shimmer rounded-[12px] border border-gray-100" />
                    ))}
                  </div>
                ) : (
                  <OrderTable
                    orders={orders}
                    isFarmer={user?.role === 'farmer'}
                    onStatusChange={fetchData}
                  />
                )}
              </section>
        
              {selectedListing && (
                <CheckoutModal
                  isOpen={checkoutOpen}
                  onClose={() => setCheckoutOpen(false)}
                  onConfirm={processOrder}
                  totalAmount={selectedListing.price_per_kg * quantity}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  maxQuantity={selectedListing.quantity_kg}
                />
              )}
            </div>
          );
     };
        
 export default Dashboard;
        

