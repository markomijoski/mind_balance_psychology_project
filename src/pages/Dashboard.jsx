import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { ArrowRight, Heart, LineChart, MoonStar, Sparkles, SunMedium, Zap } from 'lucide-react';

export default function Dashboard() {
  const { isCheckedInToday, history } = useAppContext();

  const checkedIn = isCheckedInToday();
  const checkInCount = history.length;

  const quotes = [
    'Progress matters more than perfection.',
    'Small habits create big changes.',
    'Take a deep breath. You are doing well.',
    'Be kind to your mind.',
  ];
  const todayQuote = quotes[new Date().getDay() % quotes.length];

  const average = (key) => {
    if (history.length === 0) return 0;
    return history.reduce((sum, entry) => sum + (Number(entry[key]) || 0), 0) / history.length;
  };

  const moodAverage = average('mood');
  const sleepAverage = average('sleep');
  const stressAverage = average('stress');
  const screenAverage = average('screenTime');

  const wellnessScore = history.length === 0
    ? 0
    : Math.round(
        Math.max(
          0,
          Math.min(
            100,
            (moodAverage / 5) * 35 +
              (Math.min(sleepAverage, 8) / 8) * 30 +
              (1 - Math.min(screenAverage, 10) / 10) * 20 +
              (1 - Math.min(stressAverage, 10) / 10) * 15,
          ),
        ),
      );

  const scoreAngle = Math.min(360, (wellnessScore / 100) * 360);
  const latestEntry = history[history.length - 1];

  // quickActions removed — section intentionally deleted

  const insightCards = [
    {
      label: 'Mood',
      value: history.length ? `${moodAverage.toFixed(1)}/5` : 'No data',
      icon: SunMedium,
      tone: 'text-[#9f6c34]',
    },
    {
      label: 'Sleep',
      value: history.length ? `${sleepAverage.toFixed(1)} hrs` : 'No data',
      icon: MoonStar,
      tone: 'text-[#2f5d50]',
    },
    {
      label: 'Screen time',
      value: history.length ? `${screenAverage.toFixed(1)} hrs` : 'No data',
      icon: Zap,
      tone: 'text-[#9f4f39]',
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 pt-10 pb-28">
      <header className="mb-6 relative overflow-hidden rounded-[2rem] border border-border-card bg-gradient-to-br from-white via-[#fffaf3] to-[#f7efe4] p-6 shadow-sm">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-8 h-36 w-36 rounded-full bg-[#ead0b6]/50 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-[#cfe0d6]/50 blur-2xl" />
        </div>

        <div className="relative flex items-start justify-between gap-4">
          <div className="max-w-[68%]">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-card bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted shadow-sm">
              <Sparkles size={12} />
              Daily home
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight leading-tight text-text-main">
              Hello there,
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Your check-in flow is ready. Review your wellness patterns, then take the next best step.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-[1.75rem] border border-border-card bg-white/85 px-4 py-4 text-center shadow-sm backdrop-blur-sm">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full border border-border-card bg-[conic-gradient(from_180deg_at_50%_50%,#2f5d50_0deg,#9f6c34_150deg,#eadcc9_150deg,#eadcc9_360deg)]"
              style={{
                backgroundImage: `conic-gradient(#2f5d50 0deg ${scoreAngle}deg, #eadcc9 ${scoreAngle}deg 360deg)`,
              }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-text-main">
                <span className="text-xl font-bold">{wellnessScore || '--'}</span>
              </div>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">Wellness score</span>
          </div>
        </div>
      </header>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6 relative overflow-hidden rounded-[2rem] border border-border-card bg-white p-6 shadow-sm"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2f5d50] via-[#9f6c34] to-[#9f4f39]" />
        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#f5e5d1] blur-2xl" />
        <div className="relative flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border-card bg-[#f7efe4] text-[#9f6c34] shadow-sm">
            <Sparkles size={22} />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">Daily focus</p>
            <p className="mt-2 text-lg font-medium italic leading-relaxed text-text-main">"{todayQuote}"</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="mb-6">
        {!checkedIn ? (
          <Link
            to="/app/check-in"
            className="group block w-full overflow-hidden rounded-[2rem] border border-[#201914] bg-gradient-to-br from-[#201914] via-[#2b221d] to-[#44342b] p-6 text-white shadow-lg shadow-[#201914]/20 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-[70%]">
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                  Next step
                </span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">Daily Check-In</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">Take 1 minute for yourself and keep the momentum going.</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-sm transition-transform group-hover:translate-x-0.5 group-hover:bg-white/15">
                <ArrowRight size={24} />
              </div>
            </div>
          </Link>
        ) : (
          <div className="w-full rounded-[2rem] border border-border-card bg-white p-6 text-text-main shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="rounded-full border border-border-card bg-[#f7efe4] p-3">
                <Heart className="text-[#2f5d50]" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Checked in for today!</h3>
                <p className="text-sm text-text-muted">Great job taking care of yourself.</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {insightCards.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 + index * 0.08 }}
              className="rounded-[1.75rem] border border-border-card bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">{item.label}</div>
                  <div className="mt-2 text-2xl font-semibold text-text-main">{item.value}</div>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fbf7f0] ${item.tone}`}>
                  <Icon size={20} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* "Today at a glance" section removed */}

      {/* quick actions grid removed */}

      <div className="rounded-[2rem] border border-border-card bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">Recent activity</p>
            <h2 className="mt-2 text-xl font-semibold text-text-main">Your latest check-in</h2>
          </div>
          <LineChart className="text-[#9f6c34]" size={22} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-3xl border border-border-card bg-[#fdfaf6] p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">Mood</div>
            <div className="mt-2 text-lg font-semibold text-text-main">
              {history.length ? `${latestEntry.mood}/5` : 'No data yet'}
            </div>
            <p className="mt-1 text-sm text-text-muted">How you felt last time</p>
          </div>

          <div className="rounded-3xl border border-border-card bg-[#fdfaf6] p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">Sleep</div>
            <div className="mt-2 text-lg font-semibold text-text-main">
              {history.length ? `${latestEntry.sleep} hrs` : 'No data yet'}
            </div>
            <p className="mt-1 text-sm text-text-muted">Your latest sleep input</p>
          </div>

          <div className="rounded-3xl border border-border-card bg-[#fdfaf6] p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">Stress</div>
            <div className="mt-2 text-lg font-semibold text-text-main">
              {history.length ? `${latestEntry.stress}/10` : 'No data yet'}
            </div>
            <p className="mt-1 text-sm text-text-muted">Stress level from your log</p>
          </div>

          <div className="rounded-3xl border border-border-card bg-[#fdfaf6] p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">Screen time</div>
            <div className="mt-2 text-lg font-semibold text-text-main">
              {history.length ? `${latestEntry.screenTime} hrs` : 'No data yet'}
            </div>
            <p className="mt-1 text-sm text-text-muted">Your latest screen time</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
