'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type HeroProps = {
  productImage: string;
  title: string;
  description: string;
  originalPrice: number;
  newPrice: number;
  currency?: 'USD' | 'EUR' | 'MAD';
  shape?: 'star' | 'square' | 'circle' | 'hexagon' | 'wave' | 'none';
};

export default function Hero({
  productImage,
  title,
  description,
  originalPrice,
  newPrice,
  currency = 'USD',
  shape = 'none'
}: HeroProps) {
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const calculatedDiscount = Math.round(((originalPrice - newPrice) / originalPrice) * 100);
    setDiscount(calculatedDiscount);
  }, [originalPrice, newPrice]);

  const ShapeElement = () => {
    if (shape === 'none') return null;

    return (
      <motion.div
        className={`absolute ${shape}-shape`}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="relative flex-1 text-center lg:text-left">
          <motion.h1
            className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-lg text-secondary-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary-600">
                {currency === 'USD' && '$'}
                {currency === 'EUR' && '€'}
                {currency === 'MAD' && 'MAD '}
                {newPrice}
              </span>
              <span className="text-xl text-secondary-400 line-through">
                {currency === 'USD' && '$'}
                {currency === 'EUR' && '€'}
                {currency === 'MAD' && 'MAD '}
                {originalPrice}
              </span>
            </div>
            {discount > 0 && (
              <motion.div
                className="bg-primary-600 text-white px-4 py-2 rounded-full font-bold"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20
                }}
              >
                -{discount}%
              </motion.div>
            )}
          </motion.div>
        </div>

        <div className="relative flex-1">
          <ShapeElement />
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={productImage}
              alt={title}
              className="w-full max-w-lg mx-auto rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .star-shape {
          width: 200px;
          height: 200px;
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          background: linear-gradient(45deg, var(--tw-gradient-from), var(--tw-gradient-to));
          opacity: 0.1;
          top: 10%;
          right: 10%;
        }
        .square-shape {
          width: 150px;
          height: 150px;
          background: linear-gradient(45deg, var(--tw-gradient-from), var(--tw-gradient-to));
          opacity: 0.1;
          transform: rotate(45deg);
          top: 20%;
          right: 15%;
        }
        .circle-shape {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: linear-gradient(45deg, var(--tw-gradient-from), var(--tw-gradient-to));
          opacity: 0.1;
          top: 15%;
          right: 12%;
        }
        .hexagon-shape {
          width: 180px;
          height: 180px;
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
          background: linear-gradient(45deg, var(--tw-gradient-from), var(--tw-gradient-to));
          opacity: 0.1;
          top: 15%;
          right: 12%;
        }
        .wave-shape {
          width: 250px;
          height: 200px;
          clip-path: path('M0,100 C30,120 40,80 70,100 C100,120 110,80 140,100 C170,120 180,80 210,100 C240,120 250,80 280,100 L280,200 L0,200 Z');
          background: linear-gradient(45deg, var(--tw-gradient-from), var(--tw-gradient-to));
          opacity: 0.1;
          top: 15%;
          right: 5%;
        }
      `}</style>
    </section>
  );
}