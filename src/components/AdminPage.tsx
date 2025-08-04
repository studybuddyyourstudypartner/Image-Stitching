import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, Settings, BarChart3, Shield, Database, Activity, Eye, Clock, UserCheck, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const [liveActivities, setLiveActivities] = React.useState([
    {
      id: '1',
      user: 'John Doe',
      action: 'Uploaded 3 X-ray images',
      timestamp: '2 minutes ago',
      type: 'upload',
      icon: Upload
    },
    {
      id: '2',
      user: 'Sarah Wilson',
      action: 'Completed image stitching process',
      timestamp: '5 minutes ago',
      type: 'process',
      icon: Activity
    },
    {
      id: '3',
      user: 'Mike Johnson',
      action: 'Downloaded stitched panorama',
      timestamp: '8 minutes ago',
      type: 'download',
      icon: Database
    },
    {
      id: '4',
      user: 'Emily Chen',
      action: 'Logged into the system',
      timestamp: '12 minutes ago',
      type: 'login',
      icon: UserCheck
    },
    {
    { icon: Activity, label: 'Active Sessions', value: activeUsers.toString(), change: '+15%' },

  const adminStats = [
    { icon: Users, label: 'Total Users', value: '1,234', change: '+12%' },
    { icon: Database, label: 'Projects', value: '5,678', change: '+8%' },
    { icon: Activity, label: 'Active Sessions', value: '89', change: '+15%' },
    { icon: BarChart3, label: 'Storage Used', value: storageUsed, change: '+5%' },
  ];

  const adminActions = [
    { icon: Users, title: 'User Management', description: 'Manage user accounts and permissions' },
    { icon: Settings, title: 'System Settings', description: 'Configure system-wide settings' },
    { icon: Shield, title: 'Security', description: 'Monitor security and access logs' },
    { icon: Database, title: 'Database', description: 'Database management and backups' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            System administration and management, {user?.firstName}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {adminStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Admin Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors duration-200">
                      <Icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                      <p className="text-gray-600 text-sm">{action.description}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Live User Activities */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Live User Activities</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live</span>
            </div>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {userActivities.map((activity, index) => {
              const getActivityIcon = (type: string) => {
                switch (type) {
                  case 'upload': return Upload;
                  case 'process': return Activity;
                  case 'download': return Database;
                  case 'save': return Shield;
                  case 'signup': return Users;
                  default: return Activity;
                }
              };
              
              const getActivityColor = (type: string) => {
                switch (type) {
                  case 'upload': return 'bg-blue-100 text-blue-600';
                  case 'process': return 'bg-purple-100 text-purple-600';
                  case 'download': return 'bg-green-100 text-green-600';
                  case 'save': return 'bg-yellow-100 text-yellow-600';
                  case 'signup': return 'bg-indigo-100 text-indigo-600';
                  default: return 'bg-gray-100 text-gray-600';
                }
              };

              const Icon = getActivityIcon(activity.type);
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600 truncate">{activity.action}</p>
                  </div>
                  <span className="text-sm text-gray-500 flex-shrink-0">{activity.timestamp}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};