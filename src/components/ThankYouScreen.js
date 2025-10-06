import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Home, Gift } from 'lucide-react';

const ThankYouScreen = ({ contribution, onGoHome }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <motion.div 
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Heart className="w-12 h-12 text-white fill-current" />
          </div>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          ¡Muchísimas gracias!
        </motion.h1>

        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-rose-100 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Gift className="w-6 h-6 text-rose-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Tu aporte ha sido registrado</h2>
          </div>
          
          <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200 mb-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Contribuyente:</span>
                <span className="font-semibold text-gray-800">
                  {contribution.contributorName} {contribution.contributorLastName}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Regalo:</span>
                <span className="font-semibold text-gray-800 text-right flex-1 ml-4">
                  {contribution.giftTitle}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Monto:</span>
                <span className="text-2xl font-bold text-rose-600">
                  ${contribution.amount.toLocaleString()}
                </span>
              </div>

              {contribution.message && (
                <div className="pt-4 border-t border-rose-200">
                  <span className="text-gray-600 font-medium block mb-2">Tu mensaje:</span>
                  <p className="text-gray-800 italic bg-white rounded-lg p-3 border border-rose-200">
                    "{contribution.message}"
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-6 border border-rose-200">
            <p className="text-rose-800 font-medium leading-relaxed">
              Tu generosidad significa el mundo para nosotros. Cada aporte nos acerca más a construir 
              la vida que soñamos juntos. ¡Esperamos verte en nuestra boda!
            </p>
          </div>
        </motion.div>

        <motion.button
          onClick={onGoHome}
          className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Home className="w-5 h-5" />
          Volver al inicio
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ThankYouScreen;