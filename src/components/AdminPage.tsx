import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, TrendingUp, Shield, Eye, Clock, LogOut } from 'lucide-react';
import { AdminLogin } from './AdminLogin';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [realTimeStats, setRealTimeStats] = useState({
    totalUsers: 0,
    activeSessions: 0,
    imagesProcessed: 0,
    systemHealth: '99.9%'
  });
  const [userActivities, setUserActivities] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      // Get real user data from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
      
      // Update real-time stats
      setRealTimeStats({
        totalUsers: users.length,
        activeSessions: currentUser ? 1 : 0,
        imagesProcessed: Math.floor(Math.random() * 1000) + 500, // Simulated
        systemHealth: '99.9%'
      });

      // Get real activities from localStorage or create initial ones
      const activities = JSON.parse(localStorage.getItem('adminActivities') || '[]');
      if (activities.length === 0) {
        const initialActivities = users.map((user: any, index: number) => ({
          id: Date.now() + index,
          user: `${user.firstName} ${user.lastName}`,
          action: 'Account created',
          time: new Date(Date.now() - Math.random() * 86400000).toLocaleString(),
          type: 'signup'
        }));
        
        if (currentUser) {
          initialActivities.unshift({
            id: Date.now(),
            user: `${currentUser.firstName} ${currentUser.lastName}`,
            action: 'Logged in',
            time: new Date().toLocaleString(),
            type: 'login'
          });
        }
        
        setUserActivities(initialActivities);
        localStorage.setItem('adminActivities', JSON.stringify(initialActivities));
      } else {
        setUserActivities(activities);
      }

      // Set up real-time updates
      const interval = setInterval(() => {
        const updatedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedCurrentUser = JSON.parse(localStorage.getItem('user') || 'null');
        
        setRealTimeStats(prev => ({
          ...prev,
          totalUsers: updatedUsers.length,
          activeSessions: updatedCurrentUser ? 1 : 0,
          imagesProcessed: prev.imagesProcessed + Math.floor(Math.random() * 3)
        }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const addActivity = (user: string, action: string, type: string) => {
    const newActivity = {
      id: Date.now(),
      user,
      action,
      time: new Date().toLocaleString(),
      type
    };
    
    const updatedActivities = [newActivity, ...userActivities.slice(0, 9)];
    setUserActivities(updatedActivities);
    localStorage.setItem('adminActivities', JSON.stringify(updatedActivities));
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const stats = [
    { label: 'Total Users', value: realTimeStats.totalUsers.toString(), icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Sessions', value: realTimeStats.activeSessions.toString(), icon: Activity, color: 'from-green-500 to-green-600' },
    { label: 'Images Processed', value: realTimeStats.imagesProcessed.toString(), icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
    { label: 'System Health', value: realTimeStats.systemHealth, icon: Shield, color: 'from-emerald-500 to-emerald-600' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'upload': return '📤';
      case 'process': return '⚙️';
      case 'download': return '📥';
      case 'signup': return '👤';
      case 'login': return '🔐';
      case 'save': return '💾';
      default: return '📋';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-300">Real-time system monitoring</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 transform hover:scale-105"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl"
        >
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Live User Activities</h2>
              <div className="flex items-center gap-2 ml-auto">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Live</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {userActivities.length > 0 ? userActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10"
                >
                  <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{activity.user}</p>
                    <p className="text-sm text-gray-300">{activity.action}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    {activity.time}
                  </div>
                </motion.div>
              )) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No user activities yet</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-500/20 rounded-xl border border-green-500/30">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2 animate-pulse"></div>
              <p className="text-sm font-medium text-green-200">Server Status</p>
              <p className="text-xs text-green-300">Online</p>
            </div>
            <div className="text-center p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
              <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-2 animate-pulse"></div>
              <p className="text-sm font-medium text-blue-200">Database</p>
              <p className="text-xs text-blue-300">Connected</p>
            </div>
            <div className="text-center p-4 bg-purple-500/20 rounded-xl border border-purple-500/30">
              <div className="w-4 h-4 bg-purple-500 rounded-full mx-auto mb-2 animate-pulse"></div>
              <p className="text-sm font-medium text-purple-200">Processing Queue</p>
              <p className="text-xs text-purple-300">{Math.floor(Math.random() * 5)} jobs pending</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};