import { NavLink } from 'react-router-dom';
import { Home, CheckCircle, BarChart2, Target, Lightbulb, User } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { name: 'Home', path: '/app', icon: Home },
    { name: 'Check-In', path: '/app/check-in', icon: CheckCircle },
    { name: 'Progress', path: '/app/progress', icon: BarChart2 },
    { name: 'Challenges', path: '/app/challenges', icon: Target },
    { name: 'Tips', path: '/app/tips', icon: Lightbulb },
    { name: 'Profile', path: '/app/profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass z-50 safe-bottom">
      <ul className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isAppRoot = item.path === '/app';
          return (
            <li key={item.name} className="flex-1">
              <NavLink
                to={item.path}
                end={isAppRoot}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center w-full h-full space-y-1 rounded-2xl transition-all duration-200 ${
                    isActive
                      ? 'text-text-main bg-white shadow-sm border border-border-card -translate-y-0.5'
                      : 'text-text-inactive hover:text-text-main hover:bg-white/70'
                  }`
                }
              >
                <Icon size={20} strokeWidth={2.25} />
                <span className="text-[10px] font-semibold tracking-wide">{item.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
