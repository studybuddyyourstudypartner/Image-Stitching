import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Search, Layers, Zap, Shield, Activity, Upload } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { ProcessingSteps } from './ProcessingSteps';
import { ResultsDisplay } from './ResultsDisplay';
import { motion } from 'framer-motion';

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [showResults, setShowResults] = React.useState(false);
  const [recentActivities, setRecentActivities] = React.useState([
    {
      id: '1',
      type: 'upload',
      message: 'Welcome to StitchSmart! Start by uploading your X-ray images.',
      timestamp: 'Just now',
      icon: Upload
    }
  ]);

  const features = [
    {
      icon: Search,
      title: 'Feature Detection',
      description: 'Advanced ORB algorithm detects keypoints and descriptors in medical images'
    },
    {
      icon: Layers,
      title: 'Image Matching',
      description: 'Intelligent feature matching using BFMatcher for precise alignment'
    },
    {
      icon: Zap,
      title: 'Homography Calculation',
      description: 'RANSAC-based homography computation for accurate image transformation'
    },
    {
      icon: Shield,
      title: 'Medical Grade',
      description: 'Specialized for medical X-ray image stitching with precision and reliability'
    }
  ];

  const processingSteps = [
    {
      id: 'load',
      title: 'Loading Images',
      description: 'Reading and validating uploaded X-ray images',
      icon: Upload,
      status: 'pending' as const
    },
    {
      id: 'detect',
      title: 'Feature Detection',
      description: 'Detecting keypoints using ORB algorithm',
      icon: Search,
      status: 'pending' as const
    },
    {
      id: 'match',
      title: 'Feature Matching',
      description: 'Matching features between images',
      icon: Layers,
      status: 'pending' as const
    },
    {
      id: 'stitch',
      title: 'Image Stitching',
      description: 'Computing homography and warping images',
      icon: Zap,
      status: 'pending' as const
    }
  ];

  const handleImagesSelected = (images: File[]) => {
    setSelectedImages(images);
    addActivity('upload', `Selected ${images.length} images for processing`, Upload);
  };

  const handleStitchImages = async () => {
    setIsProcessing(true);
    setCurrentStep(0);
    addActivity('process', 'Started image stitching process', Zap);

    // Simulate processing steps
    const steps = processingSteps.map(step => ({ ...step }));
    
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      steps[i].status = 'processing';
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      steps[i].status = 'completed';
    }

    setIsProcessing(false);
    setShowResults(true);
    addActivity('complete', 'Image stitching completed successfully', Shield);
  };

  const addActivity = (type: string, message: string, icon: any) => {
    const newActivity = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
      icon
    };
    setRecentActivities(prev => [newActivity, ...prev.slice(0, 4)]);
  };

  const mockResults = [
    {
      id: '1',
      title: 'Keypoints Detection - Image 1',
      description: 'Detected keypoints and descriptors using ORB algorithm',
      imageUrl: 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Keypoints+Image+1',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Keypoints Detection - Image 2',
      description: 'Detected keypoints and descriptors using ORB algorithm',
      imageUrl: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Keypoints+Image+2',
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'Feature Matches',
      description: 'Top 50 feature matches between the images',
      imageUrl: 'https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Feature+Matches',
      downloadUrl: '#'
    },
    {
      id: '4',
      title: 'Final Stitched Image',
      description: 'Complete panoramic X-ray image with seamless blending',
      imageUrl: 'https://via.placeholder.com/600x300/EF4444/FFFFFF?text=Stitched+Result',
      downloadUrl: '#'
    }
  ];

  const handleSaveToWorks = (image: any) => {
    addActivity('save', `Saved "${image.title}" to My Works`, Shield);
  };

  const handleDownload = (image: any) => {
    addActivity('download', `Downloaded "${image.title}"`, Upload);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 animate-pulse">
            Welcome to StitchSmart
          </h1>
          <p className="text-2xl text-gray-700 mb-4 font-medium">
            Hi {user?.firstName}! Ready to stitch some medical images?
          </p>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Advanced X-ray image stitching platform using computer vision algorithms 
            for seamless panoramic medical imaging.
          </p>
        </motion.div>

        {/* Image Upload Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <ImageUpload
            onImagesSelected={handleImagesSelected}
            onStitchImages={handleStitchImages}
            isProcessing={isProcessing}
          />
        </motion.div>

        {/* Processing Steps */}
        {(isProcessing || showResults) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <ProcessingSteps steps={processingSteps} currentStep={currentStep} />
          </motion.div>
        )}

        {/* Results Display */}
        {showResults && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <ResultsDisplay
              results={mockResults}
              onSaveToWorks={handleSaveToWorks}
              onDownload={handleDownload}
            />
          </motion.div>
        )}

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/20"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Live Activity</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live</span>
            </div>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.timestamp}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};