import { motion } from 'framer-motion';
import { ArrowRight, Gift, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = ({ onContinue }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <motion.div 
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
        >
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Heart className="w-12 h-12 text-white fill-current" />
            </div>
            <motion.div 
              className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Gift className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ¡Nuestra Lista de Regalos!
        </motion.h1>

        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-rose-100 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">¿Cómo funciona?</h2>
          
          <div className="space-y-4 text-left">
            <motion.div 
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-rose-600 font-bold">1</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                <strong>Elegí tu aporte favorito</strong> de nuestra lista súper original (spoiler: son todos geniales)
              </p>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-rose-600 font-bold">2</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                <strong>Hacé tu transferencia</strong> con los datos que te vamos a mostrar
              </p>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
            >
              <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-rose-600 font-bold">3</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                <strong>Dejanos un mensaje</strong> (opcional, pero nos encanta leer cositas lindas)
              </p>
            </motion.div>
          </div>

          <motion.div 
            className="mt-8 p-4 bg-rose-50 rounded-xl border border-rose-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-rose-800 text-sm font-medium">
              💡 <strong>Tip:</strong> Cada regalo tiene un "stock" limitado, así que si te gusta algo... ¡no lo pienses mucho!
            </p>
          </motion.div>
        </motion.div>

        <motion.button
          onClick={onContinue}
          className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          Ver los regalos
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <motion.button
          onClick={() => navigate('/admin')}
          className="mt-4 bg-white text-rose-600 px-6 py-3 rounded-full font-semibold text-md shadow-inner hover:shadow-md transition-all duration-200 flex items-center gap-2 mx-auto"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35 }}
        >
          Acceder (Novios)
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;