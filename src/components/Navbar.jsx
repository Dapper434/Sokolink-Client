import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Sprout } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
  