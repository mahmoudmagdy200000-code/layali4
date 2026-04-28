import { useEffect, useRef } from 'react';

/**
 * useSmartRefresh
 * Forces a page reload every 30 minutes and checks for stale state
 * when the user returns to the tab after 30 minutes of inactivity.
 */
const REFRESH_INTERVAL = 1800000; // 30 minutes

export function useSmartRefresh() {
  const lastActiveRef = useRef(Date.now());

  useEffect(() => {
    // Periodic reload
    const intervalId = setInterval(() => {
      console.log('SmartRefresh: Periodic reload triggered.');
      window.location.reload();
    }, REFRESH_INTERVAL);

    // Reload on return if inactive for too long
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const now = Date.now();
        const inactiveDuration = now - lastActiveRef.current;

        if (inactiveDuration > REFRESH_INTERVAL) {
          console.log('SmartRefresh: Inactive for too long. Reloading...');
          window.location.reload();
        } else {
          lastActiveRef.current = now;
        }
      } else {
        lastActiveRef.current = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
