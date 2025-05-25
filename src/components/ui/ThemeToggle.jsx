// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Sun, Moon, MoonStar } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useAppStore();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative flex items-center justify-center w-16 h-8 rounded-full p-1 transition-all duration-300 group
        ${isDark 
          ? 'bg-white/10 border border-white/20 hover:bg-white/15' 
          : 'bg-black/10 border border-black/20 hover:bg-black/15'
        }
        hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400/50
      `}
      whileTap={{ scale: 0.95 }}
      initial={false}
    >
      {/* Background slider */}
      <motion.div
        className={`
          absolute left-0.5 w-6 h-6 rounded-full transition-all duration-300 shadow-lg flex items-center justify-center 
          ${isDark 
            ? 'bg-gradient-to-r from-purple-400 to-blue-400' 
            : 'bg-gradient-to-r from-orange-400 to-yellow-400'
          }
        `}
        animate={{
          x: isDark ? 2 : 34
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {/* Icon inside the slider */}
        <motion.div
          animate={{
            rotate: isDark ? 0 : 180,
            scale: 1
          }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <MoonStar size={14} className="text-white drop-shadow-sm " />
          ) : (
            <Sun size={14} className="text-white drop-shadow-sm" />
          )}
        </motion.div>
      </motion.div>
      
      {/* Tooltip */}
      <div className={`
        absolute -bottom-8 left-1/2 transform -translate-x-1/2 
        px-2 py-1 rounded text-xs font-medium
        opacity-0 group-hover:opacity-100 transition-opacity duration-200
        ${isDark 
          ? 'bg-white/10 text-white border border-white/20' 
          : 'bg-black/10 text-gray-800 border border-black/20'
        }
        backdrop-blur-sm pointer-events-none whitespace-nowrap
      `}>
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
