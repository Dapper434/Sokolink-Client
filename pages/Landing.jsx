import React, { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Store } from 'lucide-react';

const ROLES = [
  {
    key: 'buyer',
    label: "I'm buying",
    hint: 'Fresh produce from verified farms',
    Icon: ShoppingBag,
    to: '/auth?role=buyer',
    active: 'text-coral-strong',
    activeIcon: 'bg-coral/10 text-coral',
    activeBorder: 'border-coral',
    from: -40,
  },
  {
    key: 'farmer',
    label: "I'm selling",
    hint: 'List your harvest, get paid via M-Pesa',
    Icon: Store,
    to: '/auth?role=farmer',
    active: 'text-teal-strong',
    activeIcon: 'bg-teal/10 text-teal',
    activeBorder: 'border-teal',
    from: 40,
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const [hoveredSide, setHoveredSide] = useState(null);

  const wordmark = 'sokolink'.split('');

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative w-full min-h-svh overflow-hidden bg-gray-900">
        {/* Full-bleed hero image */}
        <picture>
          <source
            type="image/webp"
            media="(max-width: 767px)"
            srcSet="/media/hero-farmer-mobile.webp 800w"
            sizes="100vw"
          />
          <img
            src="/media/hero-farmer-web.webp"
            srcSet="/media/hero-farmer-mobile.webp 800w, /media/hero-farmer-web.webp 1600w"
            sizes="100vw"
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[72%_center] md:object-[right_center]"
          />
        </picture>

        {/* Overlay: bottom-to-top on mobile, left-to-right on desktop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black/80 via-black/55 to-black/10 md:bg-linear-to-r md:from-black/70 md:via-black/45 md:to-transparent"
        />

        <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-7xl flex-col justify-end px-5 pb-10 pt-24 sm:px-8 md:justify-center md:pb-16 lg:px-12">
          <div className="max-w-xl">
            <h1 className="flex [text-shadow:0_2px_12px_rgb(0_0_0/0.35)]" aria-label="sokolink">
              {wordmark.map((letter, i) => (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4, type: 'spring' }}
                  className={`text-5xl md:text-7xl font-extrabold tracking-tight transition-colors duration-300 ${
                    hoveredSide === 'buyer' ? 'text-coral' : hoveredSide === 'farmer' ? 'text-teal' : 'text-white'
                  }`}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-3 text-base md:text-xl text-white/90 font-medium [text-shadow:0_1px_8px_rgb(0_0_0/0.4)]"
            >
              the marketplace where buyers and sellers meet
            </motion.p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {ROLES.map(({ key, label, hint, Icon, to, active, activeIcon, activeBorder, from }) => {
                const isActive = hoveredSide === key;
                return (
                  <motion.button
                    key={key}
                    type="button"
                    initial={{ opacity: 0, x: from }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => setHoveredSide(key)}
                    onMouseLeave={() => setHoveredSide(null)}
                    onFocus={() => setHoveredSide(key)}
                    onBlur={() => setHoveredSide(null)}
                    onClick={() => navigate(to)}
                    className={`group flex items-center gap-4 rounded-2xl border-2 bg-white/90 p-4 text-left shadow-lg backdrop-blur-md transition-all duration-300 min-h-[72px]
                      focus:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40
                      ${isActive ? `${activeBorder} bg-white` : 'border-transparent'}`}
                  >
                    <span
                      className={`shrink-0 rounded-full p-3 transition-colors duration-300 ${
                        isActive ? activeIcon : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <Icon size={26} aria-hidden="true" />
                    </span>
                    <span className="flex flex-col">
                      <span
                        className={`text-lg font-semibold transition-colors duration-300 ${
                          isActive ? active : 'text-gray-900'
                        }`}
                      >
                        {label}
                      </span>
                      <span className="text-sm text-gray-600">{hint}</span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </MotionConfig>
  );
};

export default Landing;
