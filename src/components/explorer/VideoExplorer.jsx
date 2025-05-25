import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Download, 
  Play, 
  Plus, 
  Filter, 
  Clock, 
  Eye, 
  Star,
  Globe,
  Youtube,
  Video,
  Loader,
  CheckCircle,
  X
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';

function VideoExplorer() {
  const { 
    addVideo, 
    createPlaylist, 
    addVideoToPlaylist, 
    playlists,
    setCurrentVideo,
    setActiveTab 
  } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSource, setSelectedSource] = useState('youtube');
  const [importedVideos, setImportedVideos] = useState(new Set());
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Mock YouTube API search function
  const mockYouTubeSearch = useCallback(async (query) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock YouTube search results
    const mockResults = [
      {
        id: 'dQw4w9WgXcQ',
        title: `${query} - Complete Tutorial`,
        description: `Learn ${query} from scratch with this comprehensive tutorial. Perfect for beginners and advanced users.`,
        thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
        channel: 'Tech Academy',
        duration: '45:30',
        views: '2.1M',
        publishedAt: '2 weeks ago',
        url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
        source: 'youtube'
      },
      {
        id: 'jNQXAC9IVRw',
        title: `Advanced ${query} Techniques`,
        description: `Master advanced ${query} concepts and best practices used by professionals.`,
        thumbnail: `https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg`,
        channel: 'Pro Developer',
        duration: '1:15:45',
        views: '856K',
        publishedAt: '1 month ago',
        url: `https://www.youtube.com/watch?v=jNQXAC9IVRw`,
        source: 'youtube'
      },
      {
        id: 'L_jWHffIx5E',
        title: `${query} in 10 Minutes`,
        description: `Quick overview of ${query} fundamentals. Great for getting started quickly.`,
        thumbnail: `https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg`,
        channel: 'Quick Learn',
        duration: '10:15',
        views: '3.2M',
        publishedAt: '3 days ago',
        url: `https://www.youtube.com/watch?v=L_jWHffIx5E`,
        source: 'youtube'
      },
      {
        id: 'FTQbiNvZqaY',
        title: `${query} Project Build`,
        description: `Build a real-world project using ${query}. Follow along step by step.`,
        thumbnail: `https://img.youtube.com/vi/FTQbiNvZqaY/maxresdefault.jpg`,
        channel: 'Code With Me',
        duration: '2:30:20',
        views: '445K',
        publishedAt: '5 days ago',
        url: `https://www.youtube.com/watch?v=FTQbiNvZqaY`,
        source: 'youtube'
      },
      {
        id: 'kJQP7kiw5Fk',
        title: `${query} Best Practices`,
        description: `Learn industry best practices and common pitfalls to avoid when working with ${query}.`,
        thumbnail: `https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg`,
        channel: 'Best Practices',
        duration: '35:10',
        views: '1.8M',
        publishedAt: '1 week ago',
        url: `https://www.youtube.com/watch?v=kJQP7kiw5Fk`,
        source: 'youtube'
      }
    ];

    return mockResults;
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await mockYouTubeSearch(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleImportVideo = (video) => {
    setSelectedVideo(video);
    setShowImportModal(true);
  };

  const confirmImport = (action) => {
    if (!selectedVideo) return;

    const videoData = {
      id: selectedVideo.id,
      title: selectedVideo.title,
      description: selectedVideo.description,
      url: selectedVideo.url,
      thumbnail: selectedVideo.thumbnail,
      duration: selectedVideo.duration,
      views: selectedVideo.views,
      source: selectedVideo.source,
      category: 'Imported',
      tags: [selectedVideo.source, 'imported'],
      channel: selectedVideo.channel,
      publishedAt: selectedVideo.publishedAt
    };

    addVideo(videoData);
    setImportedVideos(prev => new Set([...prev, selectedVideo.id]));

    if (action === 'watch') {
      setCurrentVideo(videoData);
      setActiveTab('player');
    } else if (action === 'playlist' && playlists.length > 0) {
      // Add to first playlist or create new one
      addVideoToPlaylist(playlists[0].id, videoData);
    }

    setShowImportModal(false);
    setSelectedVideo(null);
  };

  const sources = [
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'red' },
    { id: 'vimeo', name: 'Vimeo', icon: Video, color: 'blue' },
    { id: 'all', name: 'All Sources', icon: Globe, color: 'purple' }
  ];

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">🌍 Video Explorer</h1>
        <p className="text-gray-400">Search and import videos from multiple platforms</p>
      </div>

      {/* Search Section */}
      <div className="glass-card p-6 rounded-xl mb-8">
        {/* Source Selection */}
        <div className="flex gap-3 mb-6">
          {sources.map(source => {
            const Icon = source.icon;
            return (
              <motion.button
                key={source.id}
                onClick={() => setSelectedSource(source.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedSource === source.id
                    ? `bg-${source.color}-600 text-white`
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={18} />
                {source.name}
              </motion.button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for videos (e.g., React, JavaScript, Python...)"
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <motion.button
            onClick={handleSearch}
            disabled={!searchQuery.trim() || isSearching}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSearching ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              <Search size={20} />
            )}
            Search
          </motion.button>
        </div>

        {/* Search Stats */}
        {searchResults.length > 0 && (
          <div className="mt-4 text-sm text-gray-400">
            Found {searchResults.length} videos for "{searchQuery}"
          </div>
        )}
      </div>

      {/* Search Results */}
      {isSearching && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader size={48} className="text-purple-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Searching for videos...</p>
          </div>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">Search Results</h2>
          
          {searchResults.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4 rounded-xl hover:bg-white/10 transition-colors"
            >
              <div className="flex gap-4">
                {/* Thumbnail */}
                <div className="relative flex-shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-48 h-28 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/320/180';
                    }}
                  />
                  
                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>

                  {/* Source Badge */}
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Youtube size={12} />
                    YouTube
                  </div>
                </div>

                {/* Video Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-3 line-clamp-3">
                    {video.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>{video.channel}</span>
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {video.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {video.publishedAt}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={() => {
                        const videoData = {
                          id: video.id,
                          title: video.title,
                          description: video.description,
                          url: video.url,
                          thumbnail: video.thumbnail,
                          duration: video.duration,
                          views: video.views,
                          source: video.source,
                          category: 'Imported',
                          tags: [video.source, 'imported']
                        };
                        setCurrentVideo(videoData);
                        setActiveTab('player');
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play size={16} />
                      Watch
                    </motion.button>

                    <motion.button
                      onClick={() => handleImportVideo(video)}
                      disabled={importedVideos.has(video.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        importedVideos.has(video.id)
                          ? 'bg-green-600 text-white cursor-default'
                          : 'bg-white/10 hover:bg-white/20 text-gray-300'
                      }`}
                      whileHover={{ scale: importedVideos.has(video.id) ? 1 : 1.05 }}
                      whileTap={{ scale: importedVideos.has(video.id) ? 1 : 0.95 }}
                    >
                      {importedVideos.has(video.id) ? (
                        <>
                          <CheckCircle size={16} />
                          Imported
                        </>
                      ) : (
                        <>
                          <Download size={16} />
                          Import
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus size={16} />
                      Playlist
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Import Modal */}
      <AnimatePresence>
        {showImportModal && selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowImportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 rounded-xl w-full max-w-md"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Import Video</h3>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="mb-6">
                <img
                  src={selectedVideo.thumbnail}
                  alt={selectedVideo.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="text-white font-medium mb-2">{selectedVideo.title}</h4>
                <p className="text-gray-400 text-sm">{selectedVideo.channel} • {selectedVideo.duration}</p>
              </div>

              <div className="space-y-3">
                <motion.button
                  onClick={() => confirmImport('library')}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={20} />
                  Import to Library
                </motion.button>

                <motion.button
                  onClick={() => confirmImport('watch')}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play size={20} />
                  Import & Watch Now
                </motion.button>

                <motion.button
                  onClick={() => confirmImport('playlist')}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={20} />
                  Import to Playlist
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default VideoExplorer;
