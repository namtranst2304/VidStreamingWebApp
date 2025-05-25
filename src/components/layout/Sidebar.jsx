// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  Home, 
  Play, 
  History, 
  List, 
  BarChart3, 
  Settings,
  Star,
  Clock,
  Folder,
  Youtube,
  Video
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const Sidebar = () => {
  const { activeTab, setActiveTab, favorites, watchHistory } = useAppStore();  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'player', label: 'Video Player', icon: Play },
    { id: 'history', label: 'History', icon: History },
    { id: 'playlists', label: 'Playlists', icon: List },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const recentVideos = watchHistory.slice(0, 3);

  return (
    <motion.div 
      className="glass-sidebar w-80 h-screen flex flex-col p-6"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Play className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          StreamSync
        </h1>
      </div>

      {/* Navigation */}
      <nav className="mb-8">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`sidebar-item w-full ${isActive ? 'active' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >                <Icon className={`w-5 h-5 transition-colors duration-200`} />
                <span className="transition-colors duration-200">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Recent Videos */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Recent Videos
        </h3>
        <div className="space-y-3">
          {recentVideos.map((video) => (
            <motion.div 
              key={video.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-12 h-8 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white truncate">{video.title}</p>
                <p className="text-xs text-gray-400">{video.duration}</p>
              </div>
              <div className="w-1 h-8 bg-blue-500 rounded-full" style={{
                height: `${video.progress}%`,
                minHeight: '4px'
              }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Favorites */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Star className="w-4 h-4" />
          Favorites
          <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
            {favorites.length}
          </span>
        </h3>
      </div>

      {/* Folders */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Folder className="w-4 h-4" />
          Folders
        </h3>
        <div className="space-y-2">
          <div className="sidebar-item text-sm">
            <Youtube className="w-4 h-4 text-red-400" />
            <span>YouTube</span>
            <span className="ml-auto text-xs text-gray-400">24</span>
          </div>
          <div className="sidebar-item text-sm">
            <Video className="w-4 h-4 text-blue-400" />
            <span>Local Files</span>
            <span className="ml-auto text-xs text-gray-400">8</span>
          </div>
          <div className="sidebar-item text-sm">
            <List className="w-4 h-4 text-green-400" />
            <span>Series</span>
            <span className="ml-auto text-xs text-gray-400">12</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
