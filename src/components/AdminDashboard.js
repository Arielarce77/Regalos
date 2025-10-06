import { motion } from 'framer-motion';
import { Calendar, DollarSign, Gift, LogOut, MessageCircle, Users } from 'lucide-react';

const AdminDashboard = ({ contributions, onLogout, gifts = [], resetGiftToZero, resetAllToZero }) => {
  const totalAmount = contributions.reduce((sum, contribution) => sum + contribution.amount, 0);
  const totalContributions = contributions.length;
  const contributionsWithMessages = contributions.filter(c => c.message).length;

  const giftStats = contributions.reduce((acc, contribution) => {
    acc[contribution.giftTitle] = (acc[contribution.giftTitle] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Panel de Administración
          </h1>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="bg-white rounded-2xl p-6 shadow-lg border border-rose-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-8 h-8 text-green-500" />
              <h3 className="font-semibold text-gray-800">Total Recaudado</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">
              ${totalAmount.toLocaleString()}
            </p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-2xl p-6 shadow-lg border border-rose-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Gift className="w-8 h-8 text-rose-500" />
              <h3 className="font-semibold text-gray-800">Aportes Totales</h3>
            </div>
            <p className="text-3xl font-bold text-rose-600">
              {totalContributions}
            </p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-2xl p-6 shadow-lg border border-rose-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-8 h-8 text-blue-500" />
              <h3 className="font-semibold text-gray-800">Contribuyentes</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {totalContributions}
            </p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-2xl p-6 shadow-lg border border-rose-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <MessageCircle className="w-8 h-8 text-purple-500" />
              <h3 className="font-semibold text-gray-800">Con Mensajes</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600">
              {contributionsWithMessages}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            className="bg-white rounded-2xl p-6 shadow-lg border border-rose-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Aportes por Regalo</h2>
            <div className="space-y-4">
              {Object.entries(giftStats).map(([giftTitle, count], index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-rose-50 rounded-xl border border-rose-200">
                  <span className="font-medium text-gray-800 text-sm">{giftTitle}</span>
                  <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-2xl p-6 shadow-lg border border-rose-200"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Últimos Aportes</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {contributions.slice().reverse().map((contribution, index) => (
                <motion.div 
                  key={index}
                  className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {contribution.contributorName} {contribution.contributorLastName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {contribution.giftTitle}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-rose-600">
                      ${contribution.amount.toLocaleString()}
                    </span>
                  </div>
                  {contribution.message && (
                    <div className="bg-white rounded-lg p-3 border border-rose-200">
                      <p className="text-gray-700 italic text-sm">"{contribution.message}"</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(contribution.date).toLocaleDateString('es-AR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-rose-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Gestión de Stock</h2>
            <button
              onClick={() => { if (confirm('¿Poner todos los contadores a cero?')) resetAllToZero && resetAllToZero(); }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Poner todo a 0
            </button>
            <button
              onClick={() => { if (confirm('¿Restaurar valores por defecto (se eliminará el estado guardado)?')) resetGiftsToDefaults && resetGiftsToDefaults(); }}
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Restaurar valores por defecto
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {gifts.map(gift => (
              <div key={gift.id} className="p-4 border rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800">{gift.title}</div>
                  <div className="text-sm text-gray-500">Stock: {gift.currentStock} / {gift.maxStock >= 999 ? 'Ilimitado' : gift.maxStock}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { if (confirm(`¿Poner a 0 el stock de "${gift.title}"?`)) resetGiftToZero && resetGiftToZero(gift.id); }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    Poner a 0
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;