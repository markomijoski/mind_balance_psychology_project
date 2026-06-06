import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(error);
    }
  };

  return [storedValue, setValue];
}

const defaultChallenges = [
  { id: 1, text: 'Drink 8 glasses of water', completed: false },
  { id: 2, text: 'Sleep before midnight', completed: false },
  { id: 3, text: '1 hour without social media', completed: false },
  { id: 4, text: '15 minute walk', completed: false },
  { id: 5, text: 'Stretch for 5 minutes', completed: false },
];

export function AppProvider({ children }) {
  const [history, setHistory] = useLocalStorage('mindbalance_history', []);
  const [challenges, setChallenges] = useLocalStorage('mindbalance_challenges', defaultChallenges);
  const [lastCheckInDate, setLastCheckInDate] = useLocalStorage('mindbalance_last_checkin', null);
  
  // Reset challenges daily
  useEffect(() => {
    const today = new Date().toDateString();
    const lastReset = window.localStorage.getItem('mindbalance_last_reset');
    if (lastReset !== today) {
      const resetChallenges = defaultChallenges.map(c => ({...c, completed: false}));
      setChallenges(resetChallenges);
      window.localStorage.setItem('mindbalance_last_reset', today);
    }
  }, []);

  const addCheckIn = (data) => {
    const today = new Date().toDateString();
    setHistory(prev => [...prev, { ...data, date: new Date().toISOString(), dateString: today }]);
    setLastCheckInDate(today);
  };

  const toggleChallenge = (id) => {
    setChallenges(prev => 
      prev.map(c => c.id === id ? { ...c, completed: !c.completed } : c)
    );
  };

  const isCheckedInToday = () => {
    return lastCheckInDate === new Date().toDateString();
  };

  return (
    <AppContext.Provider value={{
      history,
      addCheckIn,
      challenges,
      toggleChallenge,
      isCheckedInToday
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
