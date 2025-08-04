import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Folder, Plus, Search, Filter, Image, Calendar, Download, Eye, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const MyWorksPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterType, setFilterType] = React.useState('all');
  const [savedWorks, setSavedWorks] = React.useState([
    {
      id: '1',
      title: 'Chest X-Ray Panorama',
      description: 'Stitched chest X-ray images for comprehensive view',
      imageUrl: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Chest+X-Ray',
      createdAt: '2024-01-15',
      type: 'chest',
      size: '2.4 MB'
    },
    {
      id: '2',
      title: 'Spine Alignment Study',
      description: 'Complete spinal column stitching for alignment analysis',
      imageUrl: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Spine+Study',
      createdAt: '2024-01-14',
      type: 'spine',
      size: '3.1 MB'
    },
    {
      id: '3',
      title: 'Dental Panoramic View',
      description: 'Full mouth X-ray stitching for dental examination',
      imageUrl: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Dental+Panorama',
      createdAt: '2024-01-13',
      type: 'dental',
      size: '1.8 MB'
    }
  ]);

  const filteredWorks = savedWorks.filter(work => {
    const matchesSearch = work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         work.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || work.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleNewWork = () => {
    // Navigate to upload page (would be handled by router in real app)
    console.log('Navigate to upload page');
  };

  const handleDownload = (work: any) => {
    console.log('Download work:', work.title);
  };

  const handleDelete = (workId: string) => {
    setSavedWorks(prev => prev.filter(work => work.id !== workId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:justify-between md:items-center mb-8"
        >
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Works
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Manage your stitched medical images, {user?.firstName}
            </p>
          </div>
          <button 
            onClick={handleNewWork}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>New Work</span>
          </button>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-white/20"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search your stitched images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Types</option>
                <option value="chest">Chest X-Ray</option>
                <option value="spine">Spine</option>
                <option value="dental">Dental</option>
              </select>
              <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Works Grid */}
        {filteredWorks.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredWorks.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-white/20 group hover:scale-105"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transform scale-90 group-hover:scale-100 transition-transform duration-200">
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{work.title}</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                      {work.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {work.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{work.createdAt}</span>
                    </div>
                    <span className="font-medium">{work.size}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownload(work)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => handleDelete(work.id)}
                      className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-full"
          >
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Folder className="w-16 h-16 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {searchTerm ? 'No matching works found' : 'No works yet'}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                {searchTerm 
                  ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
                  : 'Start creating amazing stitched medical images by uploading your first set of X-ray images.'
                }
              </p>
              {!searchTerm && (
                <button 
                  onClick={handleNewWork}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Plus className="w-6 h-6" />
                  <span>Create Your First Work</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};