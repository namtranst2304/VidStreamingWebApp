import { useState, useMemo, useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  List,
  Calendar,
  Clock,
  Plus,
  Search,
  Trash2,
  Edit3,
  MoreVertical
} from 'lucide-react';
import { Button } from '../ui';
import useAppStore from '../../store/useAppStore';

const Playlists = () => {
  const { 
    playlists, 
    videos, 
    deletePlaylist, 
    setCurrentVideo, 
    setActiveTab 
  } = useAppStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(null);

  // Memoized filtered playlists
  const filteredPlaylists = useMemo(() => {
    return playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      playlist.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [playlists, searchTerm]);

  // Optimized playlist actions
  const playPlaylist = useCallback((playlist) => {
    if (playlist.videoIds.length > 0) {
      const firstVideo = videos.find(v => v.id === playlist.videoIds[0]);
      if (firstVideo) {
        setCurrentVideo(firstVideo);
        setActiveTab('player');
      }
    }
  }, [videos, setCurrentVideo, setActiveTab]);

  const getPlaylistThumbnail = useCallback((playlist) => {
    const firstVideo = videos.find(v => v.id === playlist.videoIds[0]);
    return firstVideo?.thumbnail || '/placeholder-video.jpg';
  }, [videos]);

  const getPlaylistDuration = useCallback((playlist) => {
    return `${playlist.videoIds.length} videos`;
  }, []);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900/50 to-purple-900/50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Your Playlists</h1>
        <p className="text-gray-400">Manage your video collections</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search playlists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {/* Playlists Grid */}
      <div className="flex-1 overflow-y-auto">
        {filteredPlaylists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlaylists.map((playlist) => (
              <motion.div
                key={playlist.id}
                className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                  <img
                    src={getPlaylistThumbnail(playlist)}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-video.jpg';
                    }}
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">                    <Button
                      onClick={() => playPlaylist(playlist)}
                      variant="glass"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <Play className="w-6 h-6 text-black ml-1" />
                    </Button>
                  </div>

                  {/* Video Count Badge */}
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {playlist.videoIds.length} videos
                  </div>

                  {/* Options Menu */}
                  <div className="absolute top-2 left-2">                    <Button
                      onClick={() => setShowOptions(showOptions === playlist.id ? null : playlist.id)}
                      variant="glass"
                      size="icon"
                      className="bg-black/70 text-white p-1 rounded transition-colors hover:bg-black/90"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>

                    <AnimatePresence>
                      {showOptions === playlist.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="absolute top-8 left-0 bg-black/90 backdrop-blur-sm rounded-lg p-2 min-w-32 z-10"
                        >                          <Button 
                            variant="ghost"
                            className="w-full text-left text-white text-sm py-1 px-2 hover:bg-white/10 rounded flex items-center gap-2 justify-start"
                          >
                            <Edit3 className="w-3 h-3" />
                            Edit
                          </Button>
                          <Button 
                            onClick={() => {
                              deletePlaylist(playlist.id);
                              setShowOptions(null);
                            }}
                            variant="ghost"
                            className="w-full text-left text-red-400 text-sm py-1 px-2 hover:bg-red-500/10 rounded flex items-center gap-2 justify-start"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-white font-semibold line-clamp-1 mb-2">
                    {playlist.name}
                  </h3>
                  
                  {playlist.description && (
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                      {playlist.description}
                    </p>
                  )}

                  <div className="flex items-center text-xs text-gray-500 gap-4">
                    <div className="flex items-center gap-1">
                      <List className="w-3 h-3" />
                      {getPlaylistDuration(playlist)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(playlist.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <List className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {searchTerm ? 'No playlists found' : 'No playlists yet'}
              </h3>
              <p className="text-gray-400 mb-4">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : 'Upload some videos to create your first playlist'
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlists;
