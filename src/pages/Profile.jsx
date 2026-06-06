import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { User, Info, LogOut } from 'lucide-react';

export default function Profile() {
  const { history } = useAppContext();
  const [showAppInfo, setShowAppInfo] = useState(false);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to delete all your data? This cannot be undone.")) {
      window.localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 pt-10 pb-24">
      <header className="mb-8 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-[#f7efe4] rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm">
          <User className="text-[#2f5d50]" size={48} />
        </div>
        <h1 className="text-2xl font-semibold text-text-main">My Profile</h1>
        <p className="text-text-muted">MindBalance User</p>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-border-card overflow-hidden mb-6">
        <div className="p-6 border-b border-border-card/60">
          <h3 className="text-lg font-semibold text-text-main mb-4">Your Journey</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#fbf7f0] p-4 rounded-2xl border border-border-card">
              <div className="text-sm text-text-muted mb-1">Total Check-ins</div>
              <div className="text-2xl font-bold text-text-main">{history.length}</div>
            </div>
            <div className="bg-[#fbf7f0] p-4 rounded-2xl border border-border-card">
              <div className="text-sm text-text-muted mb-1">Current Streak</div>
              <div className="text-2xl font-bold text-text-main">{history.length} 🔥</div>
            </div>
          </div>
        </div>

        <div className="p-2">
          <button
            type="button"
            onClick={() => setShowAppInfo((value) => !value)}
            className="w-full flex items-center justify-between p-4 hover:bg-[#fbf7f0] rounded-2xl transition-colors"
            aria-expanded={showAppInfo}
            aria-controls="app-purpose-panel"
          >
            <div className="flex items-center text-text-main">
              <Info className="mr-3 text-text-inactive" size={20} />
              <span className="font-medium">What is this app for?</span>
            </div>
            <span className="text-sm font-semibold text-text-inactive">
              {showAppInfo ? 'Hide' : 'Show'}
            </span>
          </button>

          <AnimatePresence initial={false}>
            {showAppInfo && (
              <motion.div
                id="app-purpose-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="overflow-hidden px-4"
              >
                <div className="pb-4 pt-1 text-sm leading-relaxed text-text-muted">
                  MindBalance is a gentle self-check-in app that helps you track how you feel,
                  notice patterns in stress, sleep, and screen time, and build small habits that
                  support better emotional balance over time.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <button 
        onClick={handleReset}
        className="w-full flex items-center justify-center p-4 bg-[#fff2f2] text-[#a52f2f] rounded-2xl font-semibold hover:bg-[#ffe5e5] transition-colors border border-[#f3c5c5]"
      >
        <LogOut className="mr-2" size={20} />
        Reset All Data
      </button>
    </motion.div>
  );
}
