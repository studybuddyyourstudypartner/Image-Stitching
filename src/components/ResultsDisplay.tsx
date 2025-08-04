import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Save, Share2 } from 'lucide-react';

interface ProcessedImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  downloadUrl: string;
}

interface ResultsDisplayProps {
  results: ProcessedImage[];
  onSaveToWorks: (image: ProcessedImage) => void;
  onDownload: (image: ProcessedImage) => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  results, 
  onSaveToWorks, 
  onDownload 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Processing Results</h3>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Share All</span>
          </button>
          <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download All</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <img
                src={result.imageUrl}
                alt={result.title}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <div class="flex flex-col items-center justify-center text-gray-400">
                      <svg class="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                      </svg>
                      <span class="text-sm">Preview Available</span>
                    </div>
                  `;
                }}
              />
            </div>
            
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{result.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{result.description}</p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => onDownload(result)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => onSaveToWorks(result)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};