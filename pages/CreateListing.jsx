import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../src/services/api';
import Button from '../src/components/ui/Button';
import Input from '../src/components/ui/Input';
import toast from 'react-hot-toast';

export default function CreateListing() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ crop_name: '', quantity_kg: '', price_per_kg: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
          await api.post('/listings', {
            crop_name: form.crop_name,
            quantity_kg: parseFloat(form.quantity_kg),
            price_per_kg: parseFloat(form.price_per_kg),

          });
          toast.success('Listing created successfully');
          navigate('/dashboard');             
        } catch(err) {
            setError(err.response?.data?.message || 'Error creating listing');
            toast.error('Failed to create listing');
        } finally {
           setLoading(false); 
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-8">
          <div className="bg-surface-card p-6 sm:p-8 rounded-[12px] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sell your Produce</h2>
            <p className="text-gray-500 mb-8">List your fresh crops for buyers to purchase directly.</p>
    
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-4 rounded-[12px] border border-red-100">
                  {error}
                </div>
              )}
    
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Crop Name</label>
                <Input
                  type="text"
                  name="crop_name"
                  placeholder="e.g., Organic Potatoes"
                  required
                  value={form.crop_name}
                  onChange={handleChange}
                />
              </div>
    
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity Available (kg)</label>
                  <Input
                    type="number"
                    step="0.1"
                    name="quantity_kg"
                    placeholder="e.g., 50"
                    required
                    value={form.quantity_kg}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Price per kg (KES)</label>
                  <Input
                    type="number"
                    step="0.01"
                    name="price_per_kg"
                    placeholder="e.g., 120"
                    required
                    value={form.price_per_kg}
                    onChange={handleChange}
                  />
                </div>
              </div>
    
              <div className="pt-4 flex gap-4">
                <Button type="button" variant="ghost" onClick={() => navigate('/dashboard')} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={loading} className="flex-1">
                  Publish Listing
                </Button>
              </div>
            </form>
          </div>
        </div>
    );
    
 }
    
