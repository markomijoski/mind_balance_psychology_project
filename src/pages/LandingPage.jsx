import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Brain, Moon, Smartphone } from 'lucide-react';

export default function LandingPage() {
  const features = [
    { icon: Heart, title: "Track Emotions", desc: "Understand your daily feelings." },
    { icon: Brain, title: "Manage Stress", desc: "Simple exercises to find calm." },
    { icon: Moon, title: "Improve Sleep", desc: "Build healthier resting habits." },
    { icon: Smartphone, title: "Digital Balance", desc: "Reduce screen time naturally." }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#e3bc9a] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-[#a3b1a6] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-[#d6a997] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="mb-6 inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-border-card">
            <Heart className="text-[#9f6c34]" size={32} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-text-main mb-6">
            Mind<span className="text-[#2f5d50]">Balance</span>
          </h1>
          <p className="text-xl text-text-muted mb-10 leading-relaxed">
            Track your emotions. Improve your balance. Feel better every day. 
            Your gentle companion for emotional wellness.
          </p>
          
          <Link to="/app" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all bg-text-main rounded-full hover:bg-[#352a23] hover:shadow-lg hover:-translate-y-1 shadow-lg shadow-[#201914]/15">
            Open App
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/70 px-6 backdrop-blur-sm border-y border-border-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12 text-text-main">Everything you need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white rounded-3xl shadow-sm border border-border-card flex items-start space-x-4 hover:border-[#b99a72] transition-colors"
              >
                <div className="p-3 bg-[#f7efe4] rounded-2xl border border-border-card">
                  <feature.icon className="text-[#2f5d50]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-text-main">{feature.title}</h3>
                  <p className="text-text-muted">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6 text-text-main">For Your Wellbeing</h2>
        <p className="text-text-muted text-lg leading-relaxed mb-8">
          MindBalance is designed specifically for young adults navigating the complexities of modern life. 
          By encouraging daily reflection and healthy digital habits, we aim to provide a safe, non-judgmental 
          space for emotional growth.
        </p>
      </section>
    </div>
  );
}
