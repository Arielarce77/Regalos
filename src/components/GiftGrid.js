import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import GiftCard from './GiftCard';

const GiftGrid = ({ gifts, onSelectGift, onAdminAccess }) => {
  return (
    <div className="relative min-h-screen py-8 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text">
            Elegí tu regalo perfecto
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Cada aporte nos ayuda a construir nuestra vida juntos. ¡Elegí el que más te guste!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(() => {
            const visibleGifts = gifts.filter(g => g.maxStock >= 999 || g.currentStock > 0);
            if (visibleGifts.length === 0) {
              return (
                <div className="py-12 text-center col-span-full">
                  <p className="text-gray-600">No hay regalos disponibles en este momento. Volvé más tarde.</p>
                </div>
              );
            }

            return visibleGifts.map((gift, index) => (
              <GiftCard 
                key={gift.id} 
                gift={gift} 
                onSelect={onSelectGift}
                index={index}
              />
            ));
          })()}
        </div>
      </div>

      <motion.button
        onClick={onAdminAccess}
        className="fixed flex items-center justify-center transition-all duration-300 border-2 rounded-full shadow-lg bottom-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-sm border-rose-200 hover:shadow-xl text-rose-500 hover:text-rose-600 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        title="Panel de Administración"
      >
        <Shield className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
      </motion.button>
    </div>
  );
};

export default GiftGrid;