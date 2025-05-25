import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, X, Cpu, HardDrive, Wifi } from 'lucide-react';

const PerformanceMonitor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [metrics, setMetrics] = useState({
    fps: 60,
    memory: 0,
    loadTime: 0,
    networkSpeed: 'Good'
  });

  useEffect(() => {
    let animationId;
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setMetrics(prev => ({ ...prev, fps }));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    const updateMetrics = () => {
      // Memory usage (if available)
      if (performance.memory) {
        const memoryMB = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
        setMetrics(prev => ({ ...prev, memory: memoryMB }));
      }

      // Load time
      const loadTime = Math.round(performance.now());
      setMetrics(prev => ({ ...prev, loadTime }));

      // Network estimation (simplified)
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const networkSpeed = connection ? 
        connection.effectiveType === '4g' ? 'Excellent' :
        connection.effectiveType === '3g' ? 'Good' :
        connection.effectiveType === '2g' ? 'Poor' : 'Unknown'
        : 'Unknown';
      
      setMetrics(prev => ({ ...prev, networkSpeed }));
    };

    if (isOpen) {
      measureFPS();
      updateMetrics();
      const interval = setInterval(updateMetrics, 2000);
      
      return () => {
        clearInterval(interval);
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isOpen]);

  // Keyboard shortcut to toggle (Ctrl + Shift + P)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const getPerformanceColor = (fps) => {
    if (fps >= 55) return 'text-green-400';
    if (fps >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getNetworkColor = (speed) => {
    switch (speed) {
      case 'Excellent': return 'text-green-400';
      case 'Good': return 'text-blue-400';
      case 'Poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-40 p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Performance Monitor (Ctrl + Shift + P)"
      >
        <Activity size={20} />
      </motion.button>

      {/* Performance Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-4 right-4 z-50 glass-card p-4 w-64 border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-purple-400" />
                <h3 className="text-white font-medium">Performance</h3>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} className="text-gray-400" />
              </motion.button>
            </div>

            <div className="space-y-3">
              {/* FPS */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-300">FPS</span>
                </div>
                <span className={`text-sm font-medium ${getPerformanceColor(metrics.fps)}`}>
                  {metrics.fps}
                </span>
              </div>              {/* Memory */}
              {metrics.memory > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HardDrive size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-300">Memory</span>
                  </div>
                  <span className="text-sm font-medium text-blue-400">
                    {metrics.memory} MB
                  </span>
                </div>
              )}

              {/* Network */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-300">Network</span>
                </div>
                <span className={`text-sm font-medium ${getNetworkColor(metrics.networkSpeed)}`}>
                  {metrics.networkSpeed}
                </span>
              </div>

              {/* Load Time */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Load Time</span>
                <span className="text-sm font-medium text-gray-400">
                  {(metrics.loadTime / 1000).toFixed(2)}s
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-500 text-center">
                Press Ctrl + Shift + P to toggle
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PerformanceMonitor;
