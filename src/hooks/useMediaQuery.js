import { useSyncExternalStore } from 'react';

// Subscribes to a CSS media query. Reads synchronously on first render so
// components can avoid mounting heavy elements (e.g. <video>) at all.
export default function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
