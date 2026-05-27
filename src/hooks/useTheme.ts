import { useEffect, useState, useCallback } from 'react';

const LIGHT_START = 6;  // 06:00 AM
const LIGHT_END   = 19; // 07:00 PM

/** Returns 'light' or 'dark' based on the current local time. */
function getTimeBasedTheme(): 'light' | 'dark' {
  const hour = new Date().getHours();
  return hour >= LIGHT_START && hour < LIGHT_END ? 'light' : 'dark';
}

export function useTheme() {
  // Track whether the user has manually overridden the time-based theme.
  // If they have, store their preferred value; if not, follow the clock.
  const [userOverride, setUserOverride] = useState<'light' | 'dark' | null>(() => {
    const stored = localStorage.getItem('themeOverride');
    const storedHour = localStorage.getItem('themeOverrideHour');
    if (stored !== 'light' && stored !== 'dark') return null;

    // Invalidate the override if we've crossed a day threshold since it was set
    const overrideHour = storedHour !== null ? parseInt(storedHour, 10) : -1;
    const currentHour = new Date().getHours();
    const autoNow = getTimeBasedTheme();
    // If the clock-based theme now matches the override, clear it (it's redundant)
    const autoAtOverride = (overrideHour >= LIGHT_START && overrideHour < LIGHT_END)
      ? 'light' : 'dark';
    // If auto theme has since flipped back to match what user chose, drop the override
    if (autoNow === stored && autoAtOverride !== stored) return null;
    // If we're in the same clock-block as when the override was set, keep it
    if ((currentHour >= LIGHT_START) === (overrideHour >= LIGHT_START)) return stored as 'light' | 'dark';

    return null; // Override expired — the time window has changed
  });

  const theme: 'light' | 'dark' = userOverride ?? getTimeBasedTheme();

  // Apply class to <html> and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Persist override (or clear it)
  useEffect(() => {
    if (userOverride) {
      localStorage.setItem('themeOverride', userOverride);
      localStorage.setItem('themeOverrideHour', String(new Date().getHours()));
    } else {
      localStorage.removeItem('themeOverride');
      localStorage.removeItem('themeOverrideHour');
    }
  }, [userOverride]);

  // Re-check time every minute so the theme flips automatically at 6am / 7pm
  useEffect(() => {
    const tick = setInterval(() => {
      const autoTheme = getTimeBasedTheme();
      // Clear the user override once the clock naturally crosses to a new time-block
      setUserOverride(prev => {
        if (prev && prev !== autoTheme) {
          // The clock has crossed a boundary — auto mode takes over again
          return null;
        }
        return prev;
      });
    }, 60_000); // every 60 seconds

    return () => clearInterval(tick);
  }, []);

  const toggleTheme = useCallback(() => {
    setUserOverride(prev => {
      const current = prev ?? getTimeBasedTheme();
      return current === 'light' ? 'dark' : 'light';
    });
  }, []);

  return { theme, toggleTheme };
}
