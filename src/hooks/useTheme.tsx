import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useTheme = () => {
  const { user, updateUser } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (user) {
      setTheme(user.theme);
    } else {
      const savedTheme = localStorage.getItem('bitpad_theme') as 'light' | 'dark';
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, [user]);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    if (user) {
      updateUser({ theme: newTheme });
    } else {
      localStorage.setItem('bitpad_theme', newTheme);
    }
  };

  return { theme, toggleTheme };
};