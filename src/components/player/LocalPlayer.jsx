import { useState, useRef, useEffect, memo, useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import ReactPlayer from 'react-player/lazy';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  StepBack,
  StepForward,
  Maximize, 
  SkipBack, 
  SkipForward,
  Settings,
  Heart,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
  Popcorn,
  Plus,
  PictureInPicture,
  List,
  SkipForward as Next,
  Shuffle,
  Repeat,
  ChevronDown,
  X,
  Camera,
  SquareLibrary
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import TitleBar from './TitleBar';

// Memoized control components
const PlayButton = memo(({ isPlaying, onToggle }) => (
  <motion.button
    onClick={onToggle}
    className="w-16 h-16 flex items-center justify-center rounded-full glass-card border border-white/30 shadow-2xl backdrop-blur-lg bg-white/10 hover:bg-white/20 transition-all duration-200 ring-2 ring-purple-400/30 hover:ring-purple-500/50"
    whileHover={{ scale: 1.13, rotate: 2 }}
    whileTap={{ scale: 0.95 }}
    style={{
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      backdropFilter: 'blur(12px)'
    }}
  >
    {isPlaying ? (
      <Pause className="w-7 h-7 text-white drop-shadow" />
    ) : (
      <Play className="w-7 h-7 text-white ml-0.5 drop-shadow" />
    )}
  </motion.button>
));

PlayButton.displayName = 'PlayButton';

const VolumeControl = memo(({ volume, isMuted, onVolumeChange, onMuteToggle }) => {
  // Volume progress (0-100)
  const progress = volume;

  // Light beam effect for volume bar
  const lightBeam = (
    <span
      className="absolute top-0 left-0 h-full pointer-events-none"
      style={{
        width: '32px',
        left: `calc(${progress}% - 16px)`,
        opacity: progress > 2 ? 0.7 : 0,
        background: 'radial-gradient(ellipse at center, #e0f2fe 0%, #38bdf8 40%, transparent 80%)',
        filter: 'blur(7px) brightness(1.5)',
        transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s'
      }}
    />
  );

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onMuteToggle}
        className="p-1.5 hover:bg-white/10 rounded transition-colors"
      >
        {isMuted || volume === 0 ? (
          <VolumeX className="w-4 h-4 text-white" />
        ) : (
          <Volume2 className="w-4 h-4 text-white" />
        )}
      </button>
      <div className="relative w-16 h-2 flex items-center">
        {/* Volume bar background */}
        <div className="absolute left-0 top-0 w-full h-full bg-white/20 rounded-lg" />
        {/* Volume bar fill */}
        <div
          className="absolute left-0 top-0 h-full rounded-lg transition-all duration-300"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #38bdf8 0%, #2563eb 100%)',
            boxShadow: progress > 0
              ? '0 0 8px 2px #38bdf8cc, 0 0 16px 4px #2563eb88'
              : undefined,
            transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)'
          }}
        >
          {/* Light beam effect */}
          {lightBeam}
        </div>
        {/* Glassmorphism thumb */}
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => {
            const newVolume = Number(e.target.value);
            onVolumeChange(newVolume);
            if (isMuted && newVolume > 0) {
              onMuteToggle();
            }
          }}
          className="absolute w-full h-2 opacity-0 cursor-pointer"
          style={{ zIndex: 2 }}
        />
        {/* Custom thumb */}
        <div
          className="pointer-events-none absolute top-1/2 -translate-y-1/2"
          style={{
            left: `calc(${progress}% - 9px)`,
            zIndex: 3
          }}
        >
          <div className="w-4 h-4 rounded-full glass-card border border-white/30 shadow-lg bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200"
            style={{
              boxShadow: '0 2px 8px 0 #38bdf8cc',
              backdropFilter: 'blur(6px)'
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/90 shadow-inner" />
          </div>
        </div>
      </div>
    </div>
  );
});

VolumeControl.displayName = 'VolumeControl';

const ProgressBar = memo(({ currentTime, duration, seeking, tempTime, onSeekEnd, formatTime }) => {
  const progress = duration > 0 ? ((seeking ? tempTime : currentTime) / duration) * 100 : 0;

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    const newTime = (newProgress / 100) * duration;
    onSeekEnd(newTime);
  };

  // Moving light beam effect only on the filled part
  // Animate left position from 0% to progress%
  const [beamPos, setBeamPos] = useState(0);
  useEffect(() => {
    if (progress > 0) {
      let raf;
      let start;
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        // beam moves from 0 to (progress-10) percent, then loop
        const max = Math.max(progress - 10, 0);
        // Faster: 400ms per loop
        const percent = max > 0 ? ((elapsed / 400) % 1) * max : 0;
        setBeamPos(percent);
        raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
      return () => raf && cancelAnimationFrame(raf);
    } else {
      setBeamPos(0);
    }
  }, [progress]);

  return (
    <div className="flex items-center gap-3 text-sm text-white">
      <span>{formatTime(seeking ? tempTime : (currentTime || 0))}</span>
      <div className="flex-1 relative h-4 flex items-center cursor-pointer group" onClick={handleClick}>
        <div className="w-full h-1.5 bg-white/20 rounded-lg overflow-hidden relative">
          {/* Blue progress bar with glow */}
          <div
            className="absolute left-0 top-0 h-full rounded-lg transition-all duration-200"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #38bdf8 0%, #2563eb 100%)',
              boxShadow: progress > 0
                ? '0 0 16px 4px #38bdf8cc, 0 0 32px 8px #2563eb88, 0 0 32px 8px #38bdf855'
                : undefined,
              transition: 'width 0.18s cubic-bezier(0.4,0,0.2,1)'
            }}
          >
            {/* Moving light beam */}
            {progress > 10 && (
              <span
                className="absolute top-0 h-full pointer-events-none"
                style={{
                  left: `calc(${beamPos}% - 18px)`, // wider beam
                  width: '36px', // wider
                  opacity: 0.97, // brighter
                  background: 'linear-gradient(90deg, #fff 0%, #38bdf8 60%, transparent 100%)',
                  filter: 'blur(10px) brightness(2.2) drop-shadow(0 0 16px #fff)',
                  transition: 'left 0.09s cubic-bezier(0.4,0,0.2,1)'
                }}
              />
            )}
          </div>
        </div>
      </div>
      <span>{formatTime(duration || 0)}</span>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

const LocalPlayer = memo(({ sessionPlaylist }) => {
  const { 
    currentVideo,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    playbackRate,
    setPlaybackRate,
    isFullscreen,
    setIsFullscreen,    updateVideoProgress,
    addVideoToPlaylist,
    playlists,
    videos,
    createPlaylist,
    setCurrentVideo  } = useAppStore();

  const [showControls, setShowControls] = useState(true);
  const [seeking, setSeeking] = useState(false);
  const [tempTime, setTempTime] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoScale, setVideoScale] = useState(1);
  const [folderPlaylist, setFolderPlaylist] = useState([]);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [loopOne, setLoopOne] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');
  const [currentPlaylistName, setCurrentPlaylistName] = useState('Queue');
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const formatTime = useCallback((time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const handleSeek = useCallback((time) => {
    setCurrentTime(time);
    if (playerRef.current) {
      playerRef.current.seekTo(time);
    }
  }, [setCurrentTime]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.warn('Fullscreen operation failed:', error);
      setIsFullscreen(!isFullscreen);
    }
  }, [setIsFullscreen, isFullscreen]);

  const playNextVideo = useCallback(() => {
    if (folderPlaylist.length === 0) return;
    if (loopOne) {
      setCurrentTime(0);
      if (playerRef.current) playerRef.current.seekTo(0);
      setIsPlaying(true);
      return;
    }

    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * folderPlaylist.length);
    } else {
      nextIndex = currentPlaylistIndex + 1;
      if (nextIndex >= folderPlaylist.length) {
        if (repeat) {
          nextIndex = 0;
        } else {
          return;
        }
      }
    }

    setCurrentPlaylistIndex(nextIndex);
    setCurrentVideo(folderPlaylist[nextIndex]);
  }, [folderPlaylist, currentPlaylistIndex, shuffle, repeat, setCurrentVideo, loopOne, setCurrentTime, setIsPlaying]);

  const playPreviousVideo = useCallback(() => {
    if (folderPlaylist.length === 0) return;

    let prevIndex = currentPlaylistIndex - 1;
    if (prevIndex < 0) {
      prevIndex = repeat ? folderPlaylist.length - 1 : 0;
    }

    setCurrentPlaylistIndex(prevIndex);
    setCurrentVideo(folderPlaylist[prevIndex]);
  }, [folderPlaylist, currentPlaylistIndex, repeat, setCurrentVideo]);  // If sessionPlaylist is set by upload, use it for folderPlaylist  // Sync sessionPlaylist from parent to folderPlaylist
  useEffect(() => {
    if (sessionPlaylist && sessionPlaylist.length > 0) {
      console.log('Setting session playlist:', sessionPlaylist);
      setFolderPlaylist(sessionPlaylist);
      setCurrentPlaylistIndex(0);
      if (sessionPlaylist[0] && (!currentVideo || currentVideo.id !== sessionPlaylist[0].id)) {
        setCurrentVideo(sessionPlaylist[0]);
      }
      setCurrentPlaylistName('Local Files');
      setShowPlaylist(true);
    }
  }, [sessionPlaylist, setCurrentVideo, currentVideo]);

  const playVideoFromPlaylist = useCallback((index) => {
    if (index >= 0 && index < folderPlaylist.length) {
      setCurrentPlaylistIndex(index);
      setCurrentVideo(folderPlaylist[index]);
    }
  }, [folderPlaylist, setCurrentVideo]);

  const removeFromPlaylist = useCallback((index) => {
    const newPlaylist = folderPlaylist.filter((_, i) => i !== index);
    setFolderPlaylist(newPlaylist);
    
    if (index === currentPlaylistIndex && newPlaylist.length > 0) {
      const newIndex = Math.min(currentPlaylistIndex, newPlaylist.length - 1);
      setCurrentPlaylistIndex(newIndex);
      setCurrentVideo(newPlaylist[newIndex]);
    } else if (index < currentPlaylistIndex) {
      setCurrentPlaylistIndex(currentPlaylistIndex - 1);
    }
  }, [folderPlaylist, currentPlaylistIndex, setCurrentVideo]);
  // Load playlist from app store if current video belongs to one
  useEffect(() => {
    if (currentVideo && playlists.length > 0) {
      // Find playlist containing current video
      const containingPlaylist = playlists.find(playlist => 
        playlist.videoIds.includes(currentVideo.id)
      );
      
      if (containingPlaylist && containingPlaylist.videoIds.length > 1) {
        // Load videos from this playlist
        const playlistVideos = containingPlaylist.videoIds
          .map(videoId => videos.find(v => v.id === videoId))
          .filter(Boolean);
        
        if (playlistVideos.length > 0) {
          setFolderPlaylist(playlistVideos);
          const currentIndex = playlistVideos.findIndex(v => v.id === currentVideo.id);
          setCurrentPlaylistIndex(currentIndex >= 0 ? currentIndex : 0);
          setCurrentPlaylistName(containingPlaylist.name); // Set playlist name
          setShowPlaylist(true);
        }
      }
    }
  }, [currentVideo, playlists, videos]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying, setIsPlaying]);

  const handleProgress = useCallback((state) => {
    if (!seeking && state.playedSeconds !== undefined) {
      setCurrentTime(state.playedSeconds);
      if (state.loadedSeconds !== undefined) {
        setDuration(state.loadedSeconds);
      }
      
      if (currentVideo?.id && duration > 0) {
        const progress = (state.playedSeconds / duration) * 100;
        updateVideoProgress(currentVideo.id, progress, state.playedSeconds);
      }
    }
  }, [seeking, currentVideo?.id, duration, updateVideoProgress, setCurrentTime, setDuration]);

  const handleSeekMouseDown = useCallback(() => {
    setSeeking(true);
  }, []);

  const handleSeekChange = useCallback((newTime) => {
    setTempTime(newTime);
    setCurrentTime(newTime);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime);
    }
  }, [setCurrentTime]);

  const handleSeekMouseUp = useCallback((newTime) => {
    setSeeking(false);
    if (newTime !== undefined) {
      handleSeek(newTime);
    } else {
      handleSeek(tempTime);
    }
  }, [handleSeek, tempTime]);

  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  }, [setVolume, isMuted, setIsMuted]);

  const handleMuteToggle = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted, setIsMuted]);

  const handleResetVideo = useCallback(() => {
    setCurrentTime(0);
    if (playerRef.current) {
      playerRef.current.seekTo(0);
    }
    setIsPlaying(true);
  }, [setCurrentTime, setIsPlaying]);

  // Frame capture handler
  const handleFrameCapture = useCallback(() => {
    if (!playerRef.current) return;
    const videoEl = playerRef.current.getInternalPlayer && playerRef.current.getInternalPlayer();
    if (!videoEl || typeof videoEl.videoWidth !== 'number') return;
    setCapturing(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoEl.videoWidth;
      canvas.height = videoEl.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${currentVideo?.title || 'frame'}.png`;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 100);
        }
        setCapturing(false);
      }, 'image/png');
    } catch {
      setCapturing(false);
    }
  }, [currentVideo]);

  // Auto-hide controls
  useEffect(() => {
    const resetTimeout = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying && !showSettings) {
          setShowControls(false);
        }
      }, 3000);
    };

    if (showControls) {
      resetTimeout();
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls, isPlaying, showSettings]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
        case 'arrowleft':
          e.preventDefault();
          handleSeek(Math.max(0, currentTime - 10));
          break;
        case 'arrowright':
          e.preventDefault();
          handleSeek(Math.min(duration, currentTime + 10));
          break;
        case 'n':
          e.preventDefault();
          if (folderPlaylist.length > 0) {
            playNextVideo();
          }
          break;
        case 'p':
          e.preventDefault();
          if (folderPlaylist.length > 0) {
            playPreviousVideo();
          }
          break;
        case 'l':
          e.preventDefault();
          setShowPlaylist(!showPlaylist);
          break;
        case 'm':
          e.preventDefault();
          setIsMuted(!isMuted);
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'escape':
          e.preventDefault();
          if (showSettings) {
            setShowSettings(false);
          } else if (isFullscreen) {
            document.exitFullscreen().catch(() => {
              setIsFullscreen(false);
            });
          } else if (!showControls) {
            setShowControls(true);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    isPlaying, 
    currentTime, 
    duration, 
    isMuted, 
    isFullscreen, 
    showSettings, 
    showControls, 
    showPlaylist, 
    folderPlaylist.length,
    handleSeek,
    toggleFullscreen,
    playNextVideo,
    playPreviousVideo,
    setIsPlaying,
    setIsMuted,
    setShowPlaylist,
    setShowSettings,
    setIsFullscreen,
    setShowControls
  ]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [setIsFullscreen]);

  // Auto-hide controls for playlist
  useEffect(() => {
    if (showPlaylist) {
      setShowControls(false);
    }
  }, [showPlaylist]);

  const handleMouseMove = () => {
    setShowControls(true);
  };

  const getVideoUrl = () => {
    if (!currentVideo) return '';
    const url = currentVideo.url || currentVideo.file;
    if (url && (
      url.includes('youtube.com') || 
      url.includes('youtu.be') || 
      url.includes('vimeo.com') || 
      url.includes('twitch.tv') ||
      url.startsWith('http://') || 
      url.startsWith('https://')
    )) {
      console.warn('LocalPlayer: Online URL detected, rejecting:', url);
      return '';
    }
    if (url && url.startsWith('blob:')) {
      return url;
    }
    return url;
  };

  const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];


  // No video content - moved to variable

  // Persist video progress in localStorage
  useEffect(() => {
    if (currentVideo?.id && currentTime > 0 && duration > 0) {
      const progressData = JSON.parse(localStorage.getItem('playlist-progress') || '{}');
      progressData[currentVideo.id] = {
        currentTime,
        duration,
        progress: (currentTime / duration) * 100,
        updatedAt: Date.now()
      };
      localStorage.setItem('playlist-progress', JSON.stringify(progressData));
    }
  }, [currentVideo?.id, currentTime, duration]);

  // Restore progress when switching video
  useEffect(() => {
    if (currentVideo?.id) {
      const progressData = JSON.parse(localStorage.getItem('playlist-progress') || '{}');
      const saved = progressData[currentVideo.id];
      if (saved && saved.currentTime && saved.duration) {
        setCurrentTime(saved.currentTime);
        setDuration(saved.duration);
      }
    }
  }, [currentVideo?.id, setCurrentTime, setDuration]);

  // When switching playlist, load its videos

  // Reset error when switching video
  useEffect(() => {
    setError(null);
  }, [currentVideo]);
  // Listen for show-local-playlist event to always show playlist when triggered from VideoPlayer
  useEffect(() => {
    const handler = () => {
      console.log('LocalPlayer: Received show-local-playlist event, folderPlaylist length:', folderPlaylist.length);
      if (folderPlaylist.length > 0) {
        setShowPlaylist(true);
      }    };
    window.addEventListener('show-local-playlist', handler);
    return () => window.removeEventListener('show-local-playlist', handler);
  }, [folderPlaylist.length]);

  return (      <div className="flex-1 flex flex-col rounded-xl overflow-hidden">
      {/* Video Container - Ultra tight layout */}
      <div className="relative flex-1 group px-2 pb-2 pt-4 flex justify-center items-start">
        <div className="flex flex-row gap-0 items-start">
          {/* Main Video Player */}
          <motion.div 
            className="flex-1 transition-all duration-200 ease-out min-w-0"
            animate={{
              x: 0 
            }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Video Frame Container */}
            <div 
              ref={containerRef}
              className={`relative w-full aspect-video rounded-lg overflow-hidden shadow-xl glass-card border border-white/20 ${
                isFullscreen ? 'fixed inset-0 max-w-none h-full rounded-none border-none z-50 bg-black' : 'bg-black/20 max-w-5xl' 
              }`}
              style={{ 
                transform: isFullscreen ? 'scale(1)' : `scale(${videoScale})`,
                transition: 'transform 0.18s cubic-bezier(0.4,0,0.2,1), background 0.18s cubic-bezier(0.4,0,0.2,1), border-radius 0.18s cubic-bezier(0.4,0,0.2,1)'
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => !isFullscreen && setShowControls(false)}
            >
              <ReactPlayer
                ref={playerRef}
                url={getVideoUrl()}
                width="100%"
                height="100%"
                playing={isPlaying}
                volume={isMuted ? 0 : volume / 100}
                playbackRate={playbackRate}
                onProgress={handleProgress}
                onDuration={setDuration}
                onEnded={playNextVideo}
                onError={(error) => {
                  console.error('ReactPlayer error:', error);
                  setError(error);
                }}
                onReady={() => setLoading(false)}
                onBuffer={() => setLoading(true)}
                onBufferEnd={() => setLoading(false)}
                config={{
                  file: {
                    attributes: {
                      crossOrigin: 'anonymous',
                      controlsList: 'nodownload'
                    }
                  }
                }}
              />

              {/* Loading Spinner */}
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-red-500 mb-4">⚠️</div>
                    <h3 className="text-white text-lg mb-2">Playback Error</h3>
                    <p className="text-gray-400">Unable to load video</p>
                  </div>
                </div>
              )}

              {/* Controls Overlay */}
              <AnimatePresence>
                {showControls && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                  >
                    {/* Center Play/Pause Button */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="pointer-events-auto">
                        <PlayButton isPlaying={isPlaying} onToggle={handlePlayPause} />
                      </div>
                    </div>

                    {/* Bottom Controls Bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-4">
                      {/* Progress Bar */}
                      <div className="mb-3">
                        <ProgressBar
                          currentTime={currentTime}
                          duration={duration}
                          seeking={seeking}
                          tempTime={tempTime}
                          onSeekStart={handleSeekMouseDown}
                          onSeekChange={handleSeekChange}
                          onSeekEnd={handleSeekMouseUp}
                          formatTime={formatTime}
                        />
                      </div>

                      {/* Control Buttons Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {folderPlaylist.length > 0 && (
                            <>
                              <motion.button
                                onClick={playPreviousVideo}
                                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title="Previous video"
                              >
                                <StepBack size={16} />
                              </motion.button>
                            </>
                          )}

                          <motion.button
                            onClick={() => handleSeek(Math.max(0, currentTime - 10))}
                            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Rewind 10s"
                          >
                            <SkipBack size={16} />
                          </motion.button>

                          <motion.button
                            onClick={handlePlayPause}
                            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                          </motion.button>

                          <motion.button
                            onClick={() => handleSeek(Math.min(duration, currentTime + 10))}
                            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Forward 10s"
                          >
                            <SkipForward size={16} />
                          </motion.button>

                          {folderPlaylist.length > 0 && (
                            <>
                              <motion.button
                                onClick={playNextVideo}
                                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title="Next video"
                              >
                                <StepForward size={16} />
                              </motion.button>
                            </>
                          )}

                          {/* Đặt nút Restart trước cụm âm lượng */}
                          <motion.button
                            onClick={handleResetVideo}
                            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Restart from beginning"
                          >
                            <RotateCcw size={16} />
                          </motion.button>

                          {/* Loop One Button */}
                          <motion.button
                            onClick={() => setLoopOne(!loopOne)}
                            className={`p-2 rounded-lg transition-colors ${loopOne ? 'text-purple-400 bg-purple-500/20 shadow-md' : 'text-white bg-white/20 hover:bg-white/30'}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Loop current video"
                          >
                            <Repeat size={16} className={loopOne ? 'rotate-180' : ''} />
                          </motion.button>

                          {/* Frame Capture Button */}
                          <motion.button
                            onClick={handleFrameCapture}
                            className="p-2 text-white bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Capture current frame as image"
                            disabled={capturing}
                          >
                            <Camera size={16} />
                          </motion.button>

                          <VolumeControl 
                            volume={volume} 
                            isMuted={isMuted} 
                            onVolumeChange={handleVolumeChange} 
                            onMuteToggle={handleMuteToggle} 
                          />
                          
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center gap-2">
                          {/* Zoom Controls - Only show when not fullscreen */}
                          {!isFullscreen && (
                            <div className="flex items-center gap-1 border-r border-white/20 pr-3 mr-2">
                              <motion.button
                                onClick={() => setVideoScale(Math.max(0.5, videoScale - 0.1))}
                                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title="Zoom Out"
                              >
                                <ZoomOut size={14} />
                              </motion.button>
                              
                              <span className="text-white text-xs min-w-12 text-center font-mono">
                                {Math.round(videoScale * 100)}%
                              </span>
                              
                              <motion.button
                                onClick={() => setVideoScale(Math.min(2, videoScale + 0.1))}
                                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title="Zoom In"
                              >
                                <ZoomIn size={14} />
                              </motion.button>
                              
                              <motion.button
                                onClick={() => setVideoScale(1)}
                                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title="Reset Zoom"
                              >
                                <Popcorn size={14} />
                              </motion.button>
                            </div>
                          )}

                          {/* Settings Dropdown */}
                          <div className="relative">
                            <motion.button
                              onClick={() => setShowSettings(!showSettings)}
                              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="Settings"
                            >
                              <Settings size={16} />
                            </motion.button>

                            <AnimatePresence>
                              {showSettings && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                  transition={{ duration: 0.2, ease: "easeOut" }}
                                  className="absolute bottom-12 right-0 glass-card border border-white/20 rounded-xl p-4 min-w-48 z-[9999] shadow-2xl"
                                >
                                  <div className="space-y-3">
                                    <div>
                                      <label className="text-white text-sm mb-2 block font-medium">Playback Speed</label>
                                      <select
                                        value={playbackRate}
                                        onChange={(e) => setPlaybackRate(Number(e.target.value))}
                                        className="w-full bg-black/20 border border-white/20 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                                      >
                                        {playbackRates.map(rate => (
                                          <option key={rate} value={rate} className="bg-gray-800">
                                            {rate}x {rate === 1 ? '(Normal)' : ''}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Fullscreen Button */}
                          <motion.button
                            onClick={toggleFullscreen}
                            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Fullscreen"
                          >
                            <Maximize size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>            {/* Title Bar */}
            {!isFullscreen && (
              <div className="mt-3">
                <TitleBar 
                  video={currentVideo}
                  videoType="local"
                  playlistInfo={folderPlaylist.length > 0 ? {
                    currentIndex: currentPlaylistIndex,
                    totalCount: folderPlaylist.length,
                    isQueue: true
                  } : null}
                  timeInfo={{
                    currentTime: formatTime(currentTime || 0),
                    duration: formatTime(duration || 0)
                  }}
                  onPlaylistToggle={() => setShowPlaylist(!showPlaylist)}
                  showPlaylistToggle={folderPlaylist.length > 0}
                  isPlaylistVisible={showPlaylist}
                />
              </div>
            )}
          </motion.div>
          {/* Playlist Sidebar */}
          <AnimatePresence mode="wait">
            {showPlaylist && folderPlaylist.length > 0 && !isFullscreen && (
              <motion.div
                initial={{ opacity: 0, width: 0, x: 0 }} 
                animate={{ opacity: 1, width: 360, x: 0 }}  // Increased width from 330 to 400
                exit={{ opacity: 0, width: 0, x: 0 }}    
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], width: { duration: 0.2 }, x: { duration: 0.2 }, scale: { duration: 0.1, delay: 0.03 }, opacity: { duration: 0.1, delay: 0.03 } }}
                className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg flex flex-col overflow-hidden shadow-2xl flex-shrink-0 ml-1"
                style={{
                  height: 'auto',
                  maxHeight: '640px',
                  minHeight: '200px',
                }}
              >
                {/* Playlist Header */}
                <motion.div 
                  className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  style={{
                    flex: '0 0 auto'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <List className="w-4 h-4 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">Now Playing</h3>
                      <p className="text-gray-400 text-xs">{folderPlaylist.length} videos in queue</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <motion.button
                      onClick={() => setShuffle(!shuffle)}
                      className={`p-1.5 rounded-lg transition-all duration-200 ${
                        shuffle ? 'text-purple-400 bg-purple-500/20 shadow-md' : 'text-white bg-white/20 hover:bg-white/30'
                      }`}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      title="Shuffle"
                    >
                      <Shuffle size={12} />
                    </motion.button>
                    
                    <motion.button
                      onClick={() => setRepeat(!repeat)}
                      className={`p-1.5 rounded-lg transition-all duration-200 ${
                        repeat ? 'text-purple-400 bg-purple-500/20 shadow-md' : 'text-white bg-white/20 hover:bg-white/30'
                      }`}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      title="Repeat"
                    >
                      <Repeat size={12} />
                    </motion.button>

                    <motion.button
                      onClick={() => setShowPlaylist(false)}
                      className="p-1.5 text-white bg-white/20 hover:bg-red-500/30 rounded-lg transition-all duration-200 ml-1"
                      whileHover={{ scale: 1.15, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      title="Hide Playlist"
                    >
                      <X size={12} />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Playlist Content */}
                <motion.div 
                  className="flex-1 overflow-y-auto p-1 playlist-scrollbar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(147, 51, 234, 0.6) rgba(255, 255, 255, 0.05)',
                    flex: '1 1 auto',
                    minHeight: 0,
                    maxHeight: 'none'
                  }}
                >
                  <div className="space-y-0.5 p-1">
                    {folderPlaylist.map((video, index) => {
                      // Restore progress from localStorage if available
                      let progressData = {};
                      try {
                        progressData = JSON.parse(localStorage.getItem('playlist-progress') || '{}');
                      } catch {
                        progressData = {};
                      }
                      const saved = progressData[video.id];
                      const videoProgress = saved && saved.progress ? saved.progress : 0;
                      const videoCurrentTime = saved && saved.currentTime ? saved.currentTime : 0;
                      const videoDuration = saved && saved.duration ? saved.duration : video.duration;

                      return (
                        <motion.div
                          key={video.id}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.35 + (index * 0.03), 
                            duration: 0.3,
                            ease: "easeOut"
                          }}
                          className={`group relative rounded-lg cursor-pointer transition-all duration-200 ${
                            index === currentPlaylistIndex
                              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 shadow-lg'
                              : 'bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20'
                          }`}
                          whileHover={{ scale: 1.02, x: 6 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => playVideoFromPlaylist(index)}
                        >
                          <div className="flex items-center gap-3 p-3">
                            {/* Enhanced Playing Indicator */}
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                              {index === currentPlaylistIndex ? (
                                <motion.div 
                                  className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  {isPlaying ? (
                                    <motion.div
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ duration: 1, repeat: Infinity }}
                                    >
                                      <Pause size={10} className="text-white" />
                                    </motion.div>
                                  ) : (
                                    <Play size={10} className="text-white ml-0.5" />
                                  )}
                                </motion.div>
                              ) : (
                                <span className="text-gray-400 text-xs font-mono w-6 text-center group-hover:text-white transition-colors">
                                  {index + 1}
                                </span>
                              )}
                            </div>

                            {/* Video Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-xs font-medium line-clamp-2 mb-1 transition-colors ${
                                index === currentPlaylistIndex ? 'text-white' : 'text-gray-300 group-hover:text-white'
                              }`}>
                                {video.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span>{video.fileSize}</span>
                                <span>•</span>
                                {/* Show correct time for each video in playlist */}
                                <span>
                                  {index === currentPlaylistIndex
                                    ? `${formatTime(currentTime || 0)} / ${formatTime(duration || 0)}`
                                    : videoDuration && videoDuration !== '00:00'
                                      ? `${formatTime(videoCurrentTime || 0)} / ${formatTime(videoDuration || 0)}`
                                      : '--:--'}
                                </span>
                              </div>
                            </div>

                            {/* Enhanced Action Buttons */}
                            <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (index > 0) {
                                    const newPlaylist = [...folderPlaylist];
                                    [newPlaylist[index], newPlaylist[index - 1]] = [newPlaylist[index - 1], newPlaylist[index]];
                                    setFolderPlaylist(newPlaylist);
                                    if (currentPlaylistIndex === index) {
                                      setCurrentPlaylistIndex(index - 1);
                                    } else if (currentPlaylistIndex === index - 1) {
                                      setCurrentPlaylistIndex(index);
                                    }
                                  }
                                }}
                                className="p-1 text-gray-400 hover:text-white bg-black/40 hover:bg-black/60 rounded transition-all duration-200"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                title="Move up"
                                disabled={index === 0}
                              >
                                <ChevronDown size={10} className="rotate-180" />
                              </motion.button>

                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (index < folderPlaylist.length - 1) {
                                    const newPlaylist = [...folderPlaylist];
                                    [newPlaylist[index], newPlaylist[index + 1]] = [newPlaylist[index + 1], newPlaylist[index]];
                                    setFolderPlaylist(newPlaylist);
                                    if (currentPlaylistIndex === index) {
                                      setCurrentPlaylistIndex(index + 1);
                                    } else if (currentPlaylistIndex === index + 1) {
                                      setCurrentPlaylistIndex(index);
                                    }
                                  }
                                }}
                                className="p-1 text-gray-400 hover:text-white bg-black/40 hover:bg-black/60 rounded transition-all duration-200"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                title="Move down"
                                disabled={index === folderPlaylist.length - 1}
                              >
                                <ChevronDown size={10} />
                              </motion.button>

                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFromPlaylist(index);
                                }}
                                className="p-1 text-gray-400 hover:text-red-400 bg-black/40 hover:bg-red-500/30 rounded transition-all duration-200"
                                whileHover={{ scale: 1.2, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                title="Remove from playlist"
                              >
                                <X size={10} />
                              </motion.button>
                            </div>
                          </div>
                          {/* Enhanced Progress Bar */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-lg overflow-hidden">
                            {index === currentPlaylistIndex && currentTime > 0 && duration > 0 ? (
                              <motion.div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${(currentTime / duration) * 100}%` }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                              />
                            ) : (
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                style={{
                                  width: `${videoProgress || 0}%`,
                                  transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)'
                                }}
                              />
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Playlist Footer */}
                <motion.div 
                  className="p-3 border-t border-white/10 bg-gradient-to-r from-black/30 to-purple-900/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  style={{
                    flex: '0 0 auto'
                  }}
                >                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{currentPlaylistName}: {folderPlaylist.length} videos</span>
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => {
                          setFolderPlaylist([]);
                          setCurrentPlaylistName('Queue');
                          setShowPlaylist(false);
                        }}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Clear Queue
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced Custom scrollbar styles */}
      <style jsx global>{`
        .playlist-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(147, 51, 234, 0.6) rgba(255, 255, 255, 0.05);
        }
        
        .playlist-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .playlist-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 4px;
          margin: 4px 0;
        }
        
        .playlist-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgb(147, 51, 234) 0%, rgb(236, 72, 153) 100%);
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.2s ease;
        }
        
        .playlist-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgb(168, 85, 247) 0%, rgb(244, 114, 182) 100%);
          border-color: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }
        
        .playlist-scrollbar::-webkit-scrollbar-thumb:active {
          background: linear-gradient(180deg, rgb(126, 34, 206) 0%, rgb(219, 39, 119) 100%);
        }
        
        .playlist-scrollbar::-webkit-scrollbar-corner {
          background: transparent;
        }
        
        /* Smooth scrolling behavior */
        .playlist-scrollbar {
          scroll-behavior: smooth;
        }
        
        /* Hide scrollbar when not needed */
        .playlist-scrollbar:not(:hover)::-webkit-scrollbar-thumb {
          opacity: 0.6;
        }
        
        .playlist-scrollbar:hover::-webkit-scrollbar-thumb {
          opacity: 1;
        }
      `}</style>

      {/* Create Playlist Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowCreateModal(false);
              setNewPlaylistName('');
              setNewPlaylistDescription('');
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 rounded-xl w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-white mb-6">Create New Playlist</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Playlist Name *
                  </label>
                  <input
                    type="text"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="Enter playlist name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={newPlaylistDescription}
                    onChange={(e) => setNewPlaylistDescription(e.target.value)}
                    placeholder="Enter playlist description"
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewPlaylistName('');
                    setNewPlaylistDescription('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={() => {
                    if (newPlaylistName.trim()) {
                      const playlistId = createPlaylist(newPlaylistName.trim(), newPlaylistDescription.trim());
                      if (currentVideo?.id) {
                        addVideoToPlaylist(playlistId, currentVideo.id);
                        window.dispatchEvent(new CustomEvent('show-notification', { 
                          detail: { type: 'success', message: `Created playlist "${newPlaylistName}" and added current video` }
                        }));
                      } else {
                        window.dispatchEvent(new CustomEvent('show-notification', { 
                          detail: { type: 'success', message: `Created playlist "${newPlaylistName}"` }
                        }));
                      }
                      setNewPlaylistName('');
                      setNewPlaylistDescription('');
                      setShowCreateModal(false);
                    }
                  }}
                  disabled={!newPlaylistName.trim()}
                  className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Create
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>    </div>
  );
});

LocalPlayer.displayName = 'LocalPlayer';

export default LocalPlayer;

// If ReactPlayer still does not render video:
// 1. Make sure the video URL is a valid local file (e.g., blob:... or file://...).
