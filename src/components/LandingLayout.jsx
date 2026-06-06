import { Outlet } from 'react-router-dom';

export default function LandingLayout() {
  return (
    <div className="min-h-screen bg-bg-page text-text-main font-sans transition-colors duration-300 overflow-x-hidden">
      <Outlet />
    </div>
  );
}
