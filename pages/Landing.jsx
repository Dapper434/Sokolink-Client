import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Store } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();
     const [hoveredSide, setHoveredSide] = useState(null); 
  
    const wordmark = "sokolink".split("");
  