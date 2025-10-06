import { motion } from 'framer-motion';
import { Eye, EyeOff, Heart, Shield, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const u = username.trim();
    const p = password.trim();
    // DEBUG: registro temporal para depuración del login
    console.log('[AdminLogin] intento de login', { username: u, password: p });
    if (u === 'novios2025' && p === 'amor2025') {
      setError('');
      setLoading(true);
      // persist immediately in case parent handler fails
      try { localStorage.setItem('isAdminLoggedIn', 'true'); } catch (err) {}
      // call parent handler if provided
      if (typeof onLogin === 'function') onLogin();
      // redirect to admin dashboard (replace to avoid back to login)
      console.log('[AdminLogin] credenciales válidas, redirigiendo a /admin');
      navigate('/admin', { replace: true });
      return; // avoid updating state after unmount
    } else {
      console.log('[AdminLogin] credenciales inválidas');
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-orange-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <motion.div 
        className="max-w-md mx-auto relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-rose-200/50">
          <motion.div 
            className="text-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
          >
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="w-10 h-10 text-white fill-current" />
              </div>
              <motion.div 
                className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Shield className="w-4 h-4 text-white" />
              </motion.div>
            </div>
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Panel de Novios
            </h2>
            <p className="text-gray-600 font-medium">Accede para ver todos los aportes y mensajes de amor</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <User className="w-4 h-4 inline mr-2" />
                Usuario
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-6 py-4 bg-rose-50/50 border-2 border-rose-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-rose-300/30 focus:border-rose-400 transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium shadow-sm"
                  placeholder="Ingresa tu usuario"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-6 flex items-center">
                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Heart className="w-4 h-4 inline mr-2" />
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-rose-50/50 border-2 border-rose-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-rose-300/30 focus:border-rose-400 transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium shadow-sm pr-16"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg text-rose-500 hover:bg-rose-100 transition-all duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {error && (
              <motion.div 
                className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-red-700 text-sm font-medium flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading || !username || !password}
              className={`w-full py-4 rounded-2xl font-bold text-lg relative overflow-hidden group transition-all duration-300 ${loading || !username || !password ? 'bg-rose-300 text-white cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-xl hover:shadow-2xl'}`}
              whileHover={!(loading || !username || !password) ? { scale: 1.02 } : {}}
              whileTap={!(loading || !username || !password) ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <span className="relative flex items-center justify-center gap-3">
                <Heart className="w-5 h-5 fill-current" />
                {loading ? 'Accediendo...' : 'Acceder al Panel'}
              </span>
            </motion.button>
          </form>

          {/* Credenciales de acceso eliminadas de la UI por seguridad */}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;