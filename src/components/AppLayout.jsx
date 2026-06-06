import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const appBackgroundImage = 'src/assets/pexels-codioful-7130481.jpg';

export default function AppLayout() {
  return (
    <div
      className="min-h-screen bg-bg-page text-text-main font-sans pb-20 relative transition-colors duration-300 overflow-x-hidden"
      style={{
        backgroundImage: appBackgroundImage ? `url(${appBackgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-md mx-auto w-full min-h-screen shadow-2xl bg-bg-app border-x border-border-card overflow-x-hidden flex flex-col transition-colors duration-300">
        <div className="flex-1 flex flex-col">
          <Outlet />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
