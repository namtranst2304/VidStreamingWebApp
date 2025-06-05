// Import all components from organized structure with lazy loading for performance
import React, { lazy, Suspense, useState, useEffect } from 'react';
import {
  // Layout components (always loaded)
  Sidebar,
  TopNav,  // UI components (always loaded)
  NotificationSystem,
  FloatingActionButton,
  ErrorBoundary,
  // Modal components (always loaded)
  KeyboardShortcutsModal,
  // Player components
  PiPPlayer,
} from './components';
import useAppStore from './store/useAppStore';
import { Settings, Mp4ToMp3Page } from './components/pages';

// Lazy load heavy components for better performance
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const Statistics = lazy(() => import('./components/dashboard/Statistics'));
const VideoPlayer = lazy(() => import('./components/player/VideoPlayer'));
const LocalPlayer = lazy(() => import('./components/player/LocalPlayer'));
const Playlists = lazy(() => import('./components/content/Playlists'));
const History = lazy(() => import('./components/content/History'));

// Loading component for suspense fallback
const LoadingFallback = ({ message = "Loading..." }) => (
  <div className="flex-1 flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="loading-text">{message}</p>
    </div>
  </div>
);

function App() {
  const { activeTab, setActiveTab, theme } = useAppStore();
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      // Ctrl + / to show shortcuts
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        setShowShortcuts(true);
        return;
      }

      // Number keys for tab navigation
      if (e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        const tabMap = {
          '1': 'dashboard',
          '2': 'player',
          '3': 'playlists',
          '4': 'history',
          '5': 'stats',
          '6': 'settings'
        };
        setActiveTab(tabMap[e.key]);
        return;
      }

      // Escape to close modals
      if (e.key === 'Escape') {
        setShowShortcuts(false);
      }
    };

    const handleShowShortcuts = () => {
      setShowShortcuts(true);
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('show-shortcuts', handleShowShortcuts);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('show-shortcuts', handleShowShortcuts);
    };
  }, [setActiveTab]);  const renderContent = () => {
    const componentMap = {
      dashboard: { Component: Dashboard, message: "Loading Dashboard..." },
      player: { Component: VideoPlayer, message: "Loading Video Player..." },
      stats: { Component: Statistics, message: "Loading Statistics..." },
      playlists: { Component: Playlists, message: "Loading Playlists..." },
      history: { Component: History, message: "Loading History..." },
      settings: { Component: Settings, message: "Loading Settings..." },
      convert: { Component: Mp4ToMp3Page, message: "Loading MP4 to MP3 Converter..." },
    };

    const selected = componentMap[activeTab] || componentMap['dashboard'];
    const { Component, message } = selected;

    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback message={message} />}>
          <Component />
        </Suspense>
      </ErrorBoundary>
    );
  };
  return (
    <div className={`h-screen overflow-hidden transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' 
        : 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300'
    }`}>
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopNav />
          <main className="pt-2.5 pr-0.5 pl-0.5 flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
      
      {/* Picture-in-Picture Player */}
      <PiPPlayer />
      
      {/* Notification System */}
      <NotificationSystem />
      
      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal 
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}

export default App;
