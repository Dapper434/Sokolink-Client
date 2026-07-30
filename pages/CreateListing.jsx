import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
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
