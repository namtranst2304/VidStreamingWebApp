import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Volume2, 
  Play, 
  Monitor, 
  Smartphone, 
  Download, 
  Bell,
  Eye,
  Shield,
  Database,
  Trash2,
  Save,
  RotateCcw
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';

function Settings() {
  const {
    isDarkMode,
    toggleDarkMode,
    volume,
    setVolume,
    playbackRate,
    setPlaybackRate,
    watchHistory,
    clearWatchHistory,
    favorites,
    clearFavorites,
    playlists,
    settings,
    updateSettings
  } = useAppStore();

  const [showConfirmClear, setShowConfirmClear] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSettingChange = (key, value) => {
    updateSettings({ [key]: value });
    setHasUnsavedChanges(true);
  };

  const handleClearData = (type) => {
    switch (type) {
      case 'history':
        clearWatchHistory();
        break;
      case 'favorites':
        clearFavorites();
        break;
      default:
        break;
    }
    setShowConfirmClear(null);
  };

  const resetToDefaults = () => {
    updateSettings({
      autoplay: true,
      notifications: true,
      saveProgress: true,
      highQuality: true,
      subtitles: false,
      theatreMode: false,
      keyboardShortcuts: true,
      dataSync: true
    });
    setVolume(100);
    setPlaybackRate(1);
    setHasUnsavedChanges(false);
  };

  const saveSettings = () => {
    // Settings are automatically saved via zustand store
    setHasUnsavedChanges(false);
  };// eslint-disable-next-line no-unused-vars
  const SettingCard = ({ icon: Icon, title, description, children }) => (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-purple-500/20 rounded-lg">
          <Icon size={24} className="text-purple-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>
          {children}
        </div>
      </div>
    </div>
  );

  const Toggle = ({ checked, onChange, label }) => (
    <div className="flex items-center justify-between">
      <span className="text-gray-300">{label}</span>
      <motion.button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? 'bg-purple-600' : 'bg-gray-600'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
          animate={{ x: checked ? 24 : 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.button>
    </div>
  );

  const Slider = ({ value, onChange, min = 0, max = 100, step = 1, label, suffix = '' }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-gray-300">{label}</span>
        <span className="text-white font-medium">{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
      />
    </div>
  );

  const getStorageSize = () => {
    const data = {
      history: watchHistory.length,
      favorites: favorites.length,
      playlists: playlists.length
    };
    
    const totalItems = data.history + data.favorites + data.playlists;
    const estimatedMB = (totalItems * 0.1).toFixed(1); // Rough estimate
    
    return { ...data, totalItems, estimatedMB };
  };

  const storageInfo = getStorageSize();

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Customize your StreamSync experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance */}
        <SettingCard
          icon={isDarkMode ? Moon : Sun}
          title="Appearance"
          description="Customize the visual appearance of the application"
        >
          <div className="space-y-4">
            <Toggle
              checked={isDarkMode}
              onChange={toggleDarkMode}
              label="Dark Mode"
            />
            <Toggle
              checked={settings.theatreMode}
              onChange={(value) => handleSettingChange('theatreMode', value)}
              label="Theatre Mode"
            />
          </div>
        </SettingCard>

        {/* Playback */}
        <SettingCard
          icon={Play}
          title="Playback"
          description="Control video playback behavior and quality"
        >
          <div className="space-y-4">
            <Slider
              value={volume}
              onChange={setVolume}
              label="Default Volume"
              suffix="%"
            />
            <Slider
              value={playbackRate}
              onChange={setPlaybackRate}
              min={0.25}
              max={2}
              step={0.25}
              label="Default Playback Speed"
              suffix="x"
            />
            <Toggle
              checked={settings.autoplay}
              onChange={(value) => handleSettingChange('autoplay', value)}
              label="Autoplay Videos"
            />
            <Toggle
              checked={settings.highQuality}
              onChange={(value) => handleSettingChange('highQuality', value)}
              label="High Quality by Default"
            />
            <Toggle
              checked={settings.subtitles}
              onChange={(value) => handleSettingChange('subtitles', value)}
              label="Show Subtitles"
            />
          </div>
        </SettingCard>

        {/* Privacy & Data */}
        <SettingCard
          icon={Shield}
          title="Privacy & Data"
          description="Control how your data is stored and used"
        >
          <div className="space-y-4">
            <Toggle
              checked={settings.saveProgress}
              onChange={(value) => handleSettingChange('saveProgress', value)}
              label="Save Watch Progress"
            />
            <Toggle
              checked={settings.dataSync}
              onChange={(value) => handleSettingChange('dataSync', value)}
              label="Sync Data Across Devices"
            />
            <Toggle
              checked={settings.notifications}
              onChange={(value) => handleSettingChange('notifications', value)}
              label="Show Notifications"
            />
          </div>
        </SettingCard>

        {/* Accessibility */}
        <SettingCard
          icon={Eye}
          title="Accessibility"
          description="Features to improve accessibility and usability"
        >
          <div className="space-y-4">
            <Toggle
              checked={settings.keyboardShortcuts}
              onChange={(value) => handleSettingChange('keyboardShortcuts', value)}
              label="Keyboard Shortcuts"
            />
            <div className="text-sm text-gray-400 bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-gray-300 mb-2">Keyboard Shortcuts:</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>Space - Play/Pause</div>
                <div>F - Fullscreen</div>
                <div>M - Mute</div>
                <div>P - Picture-in-Picture</div>
                <div>↑/↓ - Volume</div>
                <div>←/→ - Seek</div>
              </div>
            </div>
          </div>
        </SettingCard>

        {/* Storage Management */}
        <SettingCard
          icon={Database}
          title="Storage Management"
          description="Manage your stored data and clear cache"
        >
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-gray-300 mb-3">Storage Usage</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Watch History</span>
                  <span className="text-white">{storageInfo.history} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Favorites</span>
                  <span className="text-white">{storageInfo.favorites} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Playlists</span>
                  <span className="text-white">{storageInfo.playlists} items</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
                  <span className="text-gray-300 font-medium">Estimated Size</span>
                  <span className="text-purple-400 font-medium">{storageInfo.estimatedMB} MB</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <motion.button
                onClick={() => setShowConfirmClear('history')}
                className="w-full flex items-center justify-between p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Clear Watch History</span>
                <Trash2 size={18} />
              </motion.button>

              <motion.button
                onClick={() => setShowConfirmClear('favorites')}
                className="w-full flex items-center justify-between p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Clear Favorites</span>
                <Trash2 size={18} />
              </motion.button>
            </div>
          </div>
        </SettingCard>

        {/* Reset Settings */}
        <SettingCard
          icon={RotateCcw}
          title="Reset"
          description="Reset all settings to their default values"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              This will reset all your preferences but won't affect your saved videos, playlists, or history.
            </p>
            <motion.button
              onClick={resetToDefaults}
              className="w-full flex items-center justify-center gap-2 p-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw size={18} />
              Reset to Defaults
            </motion.button>
          </div>
        </SettingCard>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-white/10">
        <motion.button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cancel
        </motion.button>        <motion.button
          onClick={saveSettings}
          className={`px-6 py-3 rounded-xl transition-colors flex items-center gap-2 ${
            hasUnsavedChanges 
              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={hasUnsavedChanges ? { scale: 1.05 } : {}}
          whileTap={hasUnsavedChanges ? { scale: 0.95 } : {}}
          disabled={!hasUnsavedChanges}
        >
          <Save size={20} />
          {hasUnsavedChanges ? 'Save Changes' : 'All Changes Saved'}
        </motion.button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmClear && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowConfirmClear(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card p-6 rounded-xl w-full max-w-md"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Clear {showConfirmClear === 'history' ? 'Watch History' : 'Favorites'}?
            </h3>
            <p className="text-gray-400 mb-6">
              This action cannot be undone. All your {showConfirmClear === 'history' ? 'watch history' : 'favorite videos'} will be permanently removed.
            </p>
            <div className="flex gap-3">
              <motion.button
                onClick={() => setShowConfirmClear(null)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={() => handleClearData(showConfirmClear)}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Clear
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Settings;
