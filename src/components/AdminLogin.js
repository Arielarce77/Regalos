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
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-orange-100">
      <div className="absolute inset-0">
        <div className="absolute w-32 h-32 rounded-full top-20 left-10 bg-rose-300/20 blur-3xl animate-pulse"></div>
        <div className="absolute w-40 h-40 delay-1000 rounded-full bottom-20 right-10 bg-pink-300/20 blur-3xl animate-pulse"></div>
        <div className="absolute w-24 h-24 delay-500 rounded-full top-1/2 left-1/3 bg-orange-300/20 blur-2xl animate-pulse"></div>
      </div>

      <motion.div 
        className="relative z-10 max-w-md mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="p-8 border shadow-2xl bg-white/95 backdrop-blur-xl rounded-3xl border-rose-200/50">
          <motion.div 
            className="mb-8 text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
          >
            <div className="relative">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full shadow-lg bg-gradient-to-br from-rose-400 to-pink-500">
                <Heart className="w-10 h-10 text-white fill-current" />
              </div>
              <motion.div 
                className="absolute flex items-center justify-center w-8 h-8 bg-orange-400 rounded-full -top-2 -right-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Shield className="w-4 h-4 text-white" />
              </motion.div>
            </div>
            
            <h2 className="mb-2 text-3xl font-bold text-transparent bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text">
              Panel de Novios
            </h2>
            <p className="font-medium text-gray-600">Accede para ver todos los aportes y mensajes de amor</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block mb-3 text-sm font-semibold text-gray-700">
                <User className="inline w-4 h-4 mr-2" />
                Usuario
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-6 py-4 font-medium text-gray-900 placeholder-gray-500 transition-all duration-300 border-2 shadow-sm bg-rose-50/50 border-rose-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-rose-300/30 focus:border-rose-400"
                  placeholder="Ingresa tu usuario"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                  <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block mb-3 text-sm font-semibold text-gray-700">
                <Heart className="inline w-4 h-4 mr-2" />
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 pr-16 font-medium text-gray-900 placeholder-gray-500 transition-all duration-300 border-2 shadow-sm bg-rose-50/50 border-rose-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-rose-300/30 focus:border-rose-400"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute p-2 transition-all duration-200 transform -translate-y-1/2 rounded-lg right-4 top-1/2 text-rose-500 hover:bg-rose-100"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {error && (
              <motion.div 
                className="flex items-center gap-3 p-4 text-sm font-medium text-red-700 border-2 border-red-200 bg-red-50 rounded-2xl"
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
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-rose-600 to-pink-600 group-hover:opacity-100"></div>
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