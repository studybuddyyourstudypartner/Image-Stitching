import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { HomePage } from './HomePage';
import { MyWorksPage } from './MyWorksPage';
import { AdminPage } from './AdminPage';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'works':
        return <MyWorksPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
};