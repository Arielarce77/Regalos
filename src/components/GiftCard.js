import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Users, Infinity } from 'lucide-react';

const GiftCard = ({ gift, onSelect, index }) => {
  const isOutOfStock = gift.currentStock === 0;
  const isUnlimited = gift.maxStock >= 999;
  const isFreeAmount = gift.suggestedAmount === 0;
  const stockPercentage = isUnlimited ? 100 : (gift.currentStock / gift.maxStock) * 100;
  
  const getStockColor = () => {
    if (isUnlimited || stockPercentage > 60) return 'bg-green-500';
    if (stockPercentage > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={!isOutOfStock ? { y: -5 } : {}}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-300 ${
        isOutOfStock 
          ? 'border-gray-200 opacity-60' 
          : 'border-rose-200 hover:border-rose-300 hover:shadow-xl'
      }`}
    >
      <div className="relative">
        <img 
          src={gift.image} 
          alt={gift.title}
          className="w-full h-48 object-cover"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
              ¡Agotado!
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {isUnlimited ? (
              <div className="flex items-center gap-1">
                <Infinity className="w-4 h-4" />
                <span>Ilimitado</span>
              </div>
            ) : (
              `${gift.currentStock}/${gift.maxStock}`
            )}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
          {gift.title}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {gift.description}
        </p>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Disponibilidad</span>
            <span>
              {isUnlimited ? 'Ilimitado' : `${gift.currentStock} de ${gift.maxStock}`}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getStockColor()}`}
              style={{ width: `${stockPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">Aporte sugerido:</span>
          <span className="text-2xl font-bold text-rose-600">
            {isFreeAmount ? (
              <span className="text-lg text-green-600 font-semibold">Libre</span>
            ) : (
              `$${gift.suggestedAmount.toLocaleString()}`
            )}
          </span>
        </div>

        <motion.button
          onClick={() => onSelect(gift)}
          disabled={isOutOfStock}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isOutOfStock
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 shadow-md hover:shadow-lg'
          }`}
          whileHover={!isOutOfStock ? { scale: 1.02 } : {}}
          whileTap={!isOutOfStock ? { scale: 0.98 } : {}}
        >
          <Gift className="w-5 h-5" />
          {isOutOfStock ? 'No disponible' : 'Elegir este regalo'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default GiftCard;