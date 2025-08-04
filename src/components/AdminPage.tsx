import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, Settings, BarChart3, Shield, Database, Activity } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();

  const adminStats = [
    { icon: Users, label: 'Total Users', value: '1,234', change: '+12%' },
    { icon: Database, label: 'Projects', value: '5,678', change: '+8%' },
    { icon: Activity, label: 'Active Sessions', value: '89', change: '+15%' },
    { icon: BarChart3, label: 'Storage Used', value: '2.4 TB', change: '+5%' },
  ];

  const adminActions = [
    { icon: Users, title: 'User Management', description: 'Manage user accounts and permissions' },
    { icon: Settings, title: 'System Settings', description: 'Configure system-wide settings' },
    { icon: Shield, title: 'Security', description: 'Monitor security and access logs' },
    { icon: Database, title: 'Database', description: 'Database management and backups' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            System administration and management, {user?.firstName}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Admin Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors duration-200">
                      <Icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                      <p className="text-gray-600 text-sm">{action.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent System Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">New user registered</p>
                <p className="text-sm text-gray-600">john.doe@example.com joined the platform</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Database backup completed</p>
                <p className="text-sm text-gray-600">Scheduled backup finished successfully</p>
              </div>
              <span className="text-sm text-gray-500">4 hours ago</span>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">System maintenance completed</p>
                <p className="text-sm text-gray-600">All services are running normally</p>
              </div>
              <span className="text-sm text-gray-500">6 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};