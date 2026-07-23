import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { ShieldCheck } from 'lucide-react';

const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };