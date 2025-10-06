import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, User, MessageCircle, CheckCircle, Copy } from 'lucide-react';

const ContributionForm = ({ selectedGift, onBack, onSubmit }) => {
  const [contributorName, setContributorName] = useState('');
  const [contributorLastName, setContributorLastName] = useState('');
  const [amount, setAmount] = useState(selectedGift?.suggestedAmount || 0);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState('');

  const bankData = {
    alias: 'boda.ariyflor',
    accountHolder: 'Maria Florencia Heiler',
    cuil: '27-38277600-9'
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contributorName.trim() && contributorLastName.trim() && amount > 0) {
      onSubmit({
        giftId: selectedGift.id,
        giftTitle: selectedGift.title,
        contributorName: contributorName.trim(),
        contributorLastName: contributorLastName.trim(),
        amount,
        message: message.trim(),
        date: new Date().toISOString()
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium mb-8 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a la lista
        </motion.button>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-rose-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Regalo seleccionado</h2>
              
              <div className="mb-4">
                <img 
                  src={selectedGift.image} 
                  alt={selectedGift.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {selectedGift.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {selectedGift.description}
              </p>

              <div className="bg-rose-50 rounded-xl p-4 border border-rose-200">
                <div className="flex justify-between items-center">
                  <span className="text-rose-700 font-medium">Aporte sugerido:</span>
                  <span className="text-2xl font-bold text-rose-600">
                    ${selectedGift.suggestedAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-rose-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Datos de transferencia</h2>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500 block">Alias:</span>
                      <span className="font-mono text-lg font-semibold">{bankData.alias}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankData.alias, 'alias')}
                      className="p-2 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
                    >
                      {copied === 'alias' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <span className="text-sm text-gray-500 block">Titular:</span>
                  <span className="font-semibold">{bankData.accountHolder}</span>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500 block">CUIL:</span>
                      <span className="font-mono font-semibold">{bankData.cuil}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankData.cuil, 'cuil')}
                      className="p-2 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
                    >
                      {copied === 'cuil' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={contributorName}
                      onChange={(e) => setContributorName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellido
                    </label>
                    <input
                      type="text"
                      value={contributorLastName}
                      onChange={(e) => setContributorLastName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Monto de tu aporte
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    Mensaje (opcional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="3"
                    placeholder="Dejanos un mensajito lindo..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Confirmar aporte
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContributionForm;