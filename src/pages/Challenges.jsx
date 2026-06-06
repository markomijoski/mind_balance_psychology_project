import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Target, CheckCircle2, Circle } from 'lucide-react';

export default function Challenges() {
  const { challenges, toggleChallenge } = useAppContext();

  const completedCount = challenges.filter(c => c.completed).length;
  const totalCount = challenges.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 pt-10 pb-24">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-text-main mb-2">Daily Challenges</h1>
          <p className="text-text-muted">Small steps to a better you.</p>
        </div>
        <div className="w-12 h-12 bg-[#f7efe4] rounded-full flex items-center justify-center border border-border-card">
          <Target className="text-[#9f6c34]" size={24} />
        </div>
      </header>

      {/* Progress Bar */}
      <div className="mb-8 p-6 bg-white rounded-3xl shadow-sm border border-border-card">
        <div className="flex justify-between items-end mb-2">
          <span className="font-semibold text-text-main">Today's Progress</span>
          <span className="text-sm font-bold text-[#9f6c34]">{completedCount}/{totalCount}</span>
        </div>
        <div className="w-full bg-[#ece1d3] rounded-full h-3 mb-2">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${progressPercent}%` }} 
            className="bg-gradient-to-r from-[#2f5d50] to-[#9f6c34] h-3 rounded-full transition-all duration-500"
          ></motion.div>
        </div>
        {progressPercent === 100 && (
          <p className="text-sm text-center text-[#9f6c34] mt-3 font-semibold">Amazing! You completed all tasks today! 🎉</p>
        )}
      </div>

      {/* Challenge List */}
      <div className="space-y-3">
        {challenges.map((challenge, index) => (
          <motion.button
            key={challenge.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => toggleChallenge(challenge.id)}
            className={`w-full flex items-center p-4 rounded-2xl transition-all border ${
              challenge.completed 
                ? 'bg-[#f7efe4] border-[#d2b18c] shadow-sm' 
                : 'bg-white border-border-card shadow-sm hover:border-[#b99a72]'
            }`}
          >
            <div className="mr-4">
              {challenge.completed ? (
                <CheckCircle2 className="text-[#2f5d50]" size={28} />
              ) : (
                <Circle className="text-text-inactive" size={28} />
              )}
            </div>
            <span className={`text-lg font-medium transition-colors ${
              challenge.completed ? 'text-text-muted line-through opacity-75' : 'text-text-main'
            }`}>
              {challenge.text}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
