import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

xport default function CreateListing() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ crop_name: '', quantity_kg: '', price_per_kg: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);