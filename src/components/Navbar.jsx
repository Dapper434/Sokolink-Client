import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Sprout } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center gap-2 group">
                  <Sprout className="h-8 w-8 text-primary-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xl font-bold tracking-tight text-slate-900">SokoLink</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors">
                  Dashboard
                </Link>
                <Link to="/orders" className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors">
                  Orders
                </Link>
                {user.role === 'farmer' && (
                  <Link to="/listings/create" className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors">
                    Add Listing
                  </Link>
                )}
                <div className="h-6 w-px bg-slate-300 mx-2"></div>
                <span className="text-sm text-slate-500">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="ml-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
  