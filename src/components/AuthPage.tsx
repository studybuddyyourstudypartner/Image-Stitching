import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { motion, AnimatePresence } from 'framer-motion';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">StitchSmart</h1>
          <p className="text-gray-600">Advanced Image Stitching Platform</p>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
            transition={{ duration: 0.3 }}
          >
            {isLogin ? (
              <LoginForm onToggleMode={toggleMode} />
            ) : (
              <SignupForm onToggleMode={toggleMode} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};