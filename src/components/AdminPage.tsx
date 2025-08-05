import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, TrendingUp, Shield, Eye, Clock } from 'lucide-react';

const AdminPage: React.FC = () => {
  const userActivities = [
    { id: 1, user: 'John Doe', action: 'Uploaded images', time: '2 minutes ago', type: 'upload' },
    { id: 2, user: 'Jane Smith', action: 'Stitched images', time: '5 minutes ago', type: 'process' },
    { id: 3, user: 'Mike Johnson', action: 'Downloaded result', time: '8 minutes ago', type: 'download' },
    { id: 4, user: 'Sarah Wilson', action: 'Signed up', time: '12 minutes ago', type: 'signup' },
    { id: 5, user: 'David Brown', action: 'Saved work', time: '15 minutes ago', type: 'save' },
  ];

  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Sessions', value: '89', icon: Activity, color: 'bg-green-500' },
    { label: 'Images Processed', value: '5,678', icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'System Health', value: '99.9%', icon: Shield, color: 'bg-emerald-500' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'upload': return '📤';
      case 'process': return '⚙️';
      case 'download': return '📥';
      case 'signup': return '👤';
      case 'save': return '💾';
      default: return '📋';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600">Monitor user activities and system performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
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
          className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-900">Live User Activities</h2>
              <div className="flex items-center gap-2 ml-auto">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Live</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {userActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors"
                >
                  <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {activity.time}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-green-800">Server Status</p>
              <p className="text-xs text-green-600">Online</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-blue-800">Database</p>
              <p className="text-xs text-blue-600">Connected</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-purple-800">Processing Queue</p>
              <p className="text-xs text-purple-600">3 jobs pending</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminPage;