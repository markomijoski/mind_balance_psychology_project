import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LandingLayout from './components/LandingLayout';
import AppLayout from './components/AppLayout';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CheckIn from './pages/CheckIn';
import Progress from './pages/Progress';
import Challenges from './pages/Challenges';
import Tips from './pages/Tips';
import Profile from './pages/Profile';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route element={<LandingLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="check-in" element={<CheckIn />} />
            <Route path="progress" element={<Progress />} />
            <Route path="challenges" element={<Challenges />} />
            <Route path="tips" element={<Tips />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
