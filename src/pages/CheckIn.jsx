import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Check, ChevronLeft } from 'lucide-react';

const MOODS = [
  { value: 5, emoji: '😄', label: 'Happy' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 3, emoji: '😐', label: 'Neutral' },
  { value: 2, emoji: '😔', label: 'Sad' },
  { value: 1, emoji: '😫', label: 'Stressed' }
];

export default function CheckIn() {
  const { addCheckIn, isCheckedInToday } = useAppContext();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ mood: null, stress: 5, sleep: 7, screenTime: 4 });
  const [showFeedback, setShowFeedback] = useState(false);
  const checkedInBackgroundImage = 'src/assets/pexels-codioful-7130481.jpg';

  const clampHours = (value) => Math.min(24, Math.max(0, value));

  const handleHoursChange = (field) => (event) => {
    const digitsOnly = event.target.value.replace(/\D/g, '');
    const nextValue = digitsOnly === '' ? 0 : clampHours(Number(digitsOnly));
    setData((current) => ({ ...current, [field]: nextValue }));
  };

  const handleHoursBlur = (field) => () => {
    setData((current) => ({ ...current, [field]: clampHours(Number(current[field]) || 0) }));
  };

  if (isCheckedInToday() && !showFeedback) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
        style={{
          backgroundImage: checkedInBackgroundImage ? `linear-gradient(rgba(255,255,255,0.88), rgba(255,255,255,0.88)), url(${checkedInBackgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-20 h-20 bg-[#f7efe4] rounded-full flex items-center justify-center mb-6 border border-border-card shadow-sm">
          <Check size={40} className="text-[#2f5d50]" />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-text-main">Already checked in!</h2>
        <p className="text-text-muted mb-8">You've completed your check-in for today. Come back tomorrow!</p>
        <button onClick={() => navigate('/app')} className="px-6 py-3 bg-white border border-border-card rounded-full font-semibold text-text-main hover:bg-[#fbf7f0] shadow-sm">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const handleSubmit = () => {
    addCheckIn(data);
    setShowFeedback(true);
  };

  const getFeedbackMessage = () => {
    if (data.stress > 7) return "You seem stressed today. Try taking a short break and breathing deeply.";
    if (data.sleep < 6) return "Good sleep helps emotional balance. Try to get to bed a bit earlier tonight.";
    if (data.screenTime > 6) return "Reducing screen time can improve focus and mood. Consider a digital detox evening.";
    return "You're doing great! Keep up the balanced habits.";
  };

  if (showFeedback) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <div className="bg-white p-8 rounded-3xl mb-8 border border-border-card shadow-sm max-w-md">
          <h2 className="text-2xl font-semibold text-text-main mb-4">Check-in Complete</h2>
          <p className="text-lg text-text-muted leading-relaxed">{getFeedbackMessage()}</p>
        </div>
        <button 
          onClick={() => navigate('/app')}
          className="px-8 py-4 bg-text-main text-white rounded-full font-semibold hover:bg-[#352a23] shadow-lg shadow-[#201914]/15"
        >
          Return Home
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] p-6 pt-10">
      {/* Header / Progress */}
      <div className="flex items-center justify-between mb-12">
        {step > 1 ? (
          <button onClick={handlePrev} className="p-2 -ml-2 text-text-inactive hover:text-text-main">
            <ChevronLeft size={28} />
          </button>
        ) : <div className="w-11" />}
        <div className="flex space-x-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`w-3 h-3 rounded-full ${step >= i ? 'bg-[#839788]' : 'bg-stone-200'}`} />
          ))}
        </div>
        <div className="w-11" />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
            <h2 className="text-3xl font-semibold mb-8 text-center text-text-main">How are you feeling right now?</h2>
            <div className="grid grid-cols-2 gap-4 flex-1 content-center">
              {MOODS.map(m => (
                <button
                  key={m.value}
                  onClick={() => { setData({ ...data, mood: m.value }); handleNext(); }}
                  className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all ${
                    data.mood === m.value ? 'border-[#2f5d50] bg-[#f0f6f2] shadow-sm' : 'border-border-card bg-white hover:border-[#b99a72]'
                  }`}
                >
                  <span className="text-5xl mb-2">{m.emoji}</span>
                  <span className="font-semibold text-text-muted">{m.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
            <h2 className="text-3xl font-semibold mb-12 text-center text-text-main">How stressed do you feel?</h2>
            <div className="flex-1 flex flex-col justify-center px-4">
              <div className="text-center text-6xl font-bold text-[#9f6c34] mb-8">{data.stress}</div>
              <input
                type="range"
                min="1"
                max="10"
                value={data.stress}
                onChange={(e) => setData({ ...data, stress: parseInt(e.target.value) })}
                className="w-full h-3 bg-[#e8ddd0] rounded-lg appearance-none cursor-pointer accent-[#9f6c34]"
              />
              <div className="flex justify-between text-text-inactive mt-4 font-medium">
                <span>Relaxed</span>
                <span>Overwhelmed</span>
              </div>
            </div>
            <button onClick={handleNext} className="mt-auto w-full py-4 bg-text-main text-white rounded-full font-semibold text-lg shadow-lg shadow-[#201914]/15">Next</button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
            <h2 className="text-3xl font-semibold mb-12 text-center text-text-main">Hours of sleep last night?</h2>
            <div className="flex-1 flex flex-col justify-center items-center">
              <span className="text-6xl mb-6">🌙</span>
              <div className="flex flex-col items-center gap-3 text-[#2f5d50]">
                <div className="flex items-end gap-3 px-5 py-4 rounded-3xl bg-white border border-border-card shadow-sm">
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="1"
                  inputMode="numeric"
                  value={data.sleep}
                  onChange={handleHoursChange('sleep')}
                  onBlur={handleHoursBlur('sleep')}
                  className="w-24 text-center text-5xl font-bold bg-transparent border-0 outline-none text-text-main leading-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-text-inactive mb-2">hrs</span>
                </div>
                <p className="text-sm text-text-muted">Use a value from 0 to 24.</p>
              </div>
            </div>
            <button onClick={handleNext} className="mt-auto w-full py-4 bg-text-main text-white rounded-full font-semibold text-lg shadow-lg shadow-[#201914]/15">Next</button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
            <h2 className="text-3xl font-semibold mb-12 text-center text-text-main">Hours online today?</h2>
            <div className="flex-1 flex flex-col justify-center items-center">
              <span className="text-6xl mb-6">📱</span>
              <div className="flex flex-col items-center gap-3 text-[#9f6c34]">
                <div className="flex items-end gap-3 px-5 py-4 rounded-3xl bg-white border border-border-card shadow-sm">
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="1"
                  inputMode="numeric"
                  value={data.screenTime}
                  onChange={handleHoursChange('screenTime')}
                  onBlur={handleHoursBlur('screenTime')}
                  className="w-24 text-center text-5xl font-bold bg-transparent border-0 outline-none text-text-main leading-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-text-inactive mb-2">hrs</span>
                </div>
                <p className="text-sm text-text-muted">Use a value from 0 to 24.</p>
              </div>
            </div>
            <button onClick={handleSubmit} className="mt-auto w-full py-4 bg-gradient-to-r from-[#2f5d50] to-[#476b5d] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
              Complete Check-In
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
