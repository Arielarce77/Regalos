import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import GiftCard from './GiftCard';

const GiftGrid = ({ gifts, onSelectGift, onAdminAccess }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-8 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Elegí tu regalo perfecto
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Cada aporte nos ayuda a construir nuestra vida juntos. ¡Elegí el que más te guste!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gifts.map((gift, index) => (
            <GiftCard 
              key={gift.id} 
              gift={gift} 
              onSelect={onSelectGift}
              index={index}
            />
          ))}
        </div>
      </div>

      <motion.button
        onClick={onAdminAccess}
        className="fixed bottom-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-sm border-2 border-rose-200 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-rose-500 hover:text-rose-600 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        title="Panel de Administración"
      >
        <Shield className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
      </motion.button>
    </div>
  );
};

export default GiftGrid;