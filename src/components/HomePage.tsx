import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Camera, Image, Zap, Users } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Camera,
      title: 'Smart Capture',
      description: 'Advanced algorithms for optimal image capture and alignment'
    },
    {
      icon: Image,
      title: 'Seamless Stitching',
      description: 'Create panoramic images with perfect blending and minimal distortion'
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Lightning-fast processing with real-time preview capabilities'
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'Share and collaborate on projects with team members'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to StitchSmart, {user?.firstName}!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your advanced image stitching platform for creating stunning panoramic images 
            with professional-grade quality and precision.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl transition-colors duration-200 text-left">
              <div className="flex items-center space-x-3 mb-2">
                <Camera className="w-6 h-6" />
                <span className="font-semibold">New Project</span>
              </div>
              <p className="text-blue-100 text-sm">
                Start a new image stitching project
              </p>
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl transition-colors duration-200 text-left">
              <div className="flex items-center space-x-3 mb-2">
                <Image className="w-6 h-6" />
                <span className="font-semibold">Upload Images</span>
              </div>
              <p className="text-green-100 text-sm">
                Upload images for stitching
              </p>
            </button>

            <button className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-xl transition-colors duration-200 text-left">
              <div className="flex items-center space-x-3 mb-2">
                <Zap className="w-6 h-6" />
                <span className="font-semibold">Quick Stitch</span>
              </div>
              <p className="text-purple-100 text-sm">
                Fast automatic stitching mode
              </p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Image className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Welcome to StitchSmart!</p>
                <p className="text-sm text-gray-600">Get started by creating your first project</p>
              </div>
              <span className="text-sm text-gray-500">Just now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};