import { Icon } from '@iconify/react';
import { useTheme } from '../../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-brand-primary outline-none flex items-center justify-center text-black dark:text-white"
    >
      <Icon 
        icon={theme === 'dark' ? 'ph:sun-bold' : 'ph:moon-bold'} 
        className="w-6 h-6 transition-opacity duration-200" 
      />
    </button>
  );
}
