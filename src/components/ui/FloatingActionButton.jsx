import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Upload, 
  Bookmark, 
  Search, 
  Settings, 
  HelpCircle,
  X,
  MessageCircle
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import VideoNotes from './VideoNotes';

function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false); // rename for clarity
  const { setActiveTab } = useAppStore();

  const actions = [
    {
      icon: Upload,
      label: 'Upload Video',
      action: () => setActiveTab('player'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Bookmark,
      label: 'Create Playlist',
      action: () => setActiveTab('playlists'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Search,
      label: 'Search',
      action: () => {
        window.dispatchEvent(new CustomEvent('open-search'));
      },
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: MessageCircle,
      label: 'Video Notes',
      action: () => setIsNotesOpen(true), // use setIsNotesOpen
      color: 'bg-fuchsia-600 hover:bg-fuchsia-700'
    },
    {
      icon: Settings,
      label: 'Settings',
      action: () => setActiveTab('settings'),
      color: 'bg-gray-500 hover:bg-gray-600'
    },
    {
      icon: HelpCircle,
      label: 'Help',
      action: () => {
        window.dispatchEvent(new CustomEvent('show-shortcuts'));
      },
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  const handleActionClick = (action) => {
    action.action();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Action Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div className="absolute bottom-16 right-0 space-y-3">
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="glass-card px-3 py-2 rounded-lg">
                  <span className="text-white text-sm font-medium whitespace-nowrap">
                    {action.label}
                  </span>
                </div>
                <motion.button
                  onClick={() => handleActionClick(action)}
                  className={`w-12 h-12 rounded-full ${action.color} shadow-lg flex items-center justify-center text-white transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <action.icon size={20} />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg flex items-center justify-center text-white transition-all ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ 
          boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
        }}
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-transparent"
            onClick={() => setIsOpen(false)}
            style={{ zIndex: -1 }}
          />
        )}
      </AnimatePresence>

      {/* Render VideoNotes panel if isNotesOpen is true */}
      <VideoNotes isOpen={isNotesOpen} onClose={() => setIsNotesOpen(false)} />
    </div>
  );
}

export default FloatingActionButton;
