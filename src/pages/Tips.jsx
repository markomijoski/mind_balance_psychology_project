import { motion } from 'framer-motion';
import { Lightbulb, Coffee, BookHeart, Wind } from 'lucide-react';

export default function Tips() {
  const tips = [
    {
      icon: Wind,
      title: "Box Breathing",
      desc: "Inhale for 4s, hold for 4s, exhale for 4s, hold for 4s. Repeat to calm your nervous system.",
      color: "bg-[#eef5f1] text-[#2f5d50]"
    },
    {
      icon: Coffee,
      title: "Morning Routine",
      desc: "Start your day with a glass of water before looking at your phone to reduce morning anxiety.",
      color: "bg-[#f7efe4] text-[#9f6c34]"
    },
    {
      icon: BookHeart,
      title: "Gratitude Journaling",
      desc: "Write down 3 things you are grateful for each night to improve your baseline happiness.",
      color: "bg-white text-[#7b3928] border border-border-card"
    },
    {
      icon: Lightbulb,
      title: "Digital Sunset",
      desc: "Turn off screens 1 hour before bed to improve your sleep quality significantly.",
      color: "bg-[#fffaf3] text-[#7b5a2b] border border-border-card"
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 pt-10 pb-24">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-text-main mb-2">Wellness Tips</h1>
        <p className="text-text-muted">Simple ways to improve your day.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {tips.map((tip, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white rounded-3xl shadow-sm border border-border-card flex flex-col"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${tip.color}`}>
              <tip.icon size={24} />
            </div>
            <h3 className="text-xl font-semibold text-text-main mb-2">{tip.title}</h3>
            <p className="text-text-muted leading-relaxed">{tip.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
