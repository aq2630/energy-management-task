import { useEffect, useRef, useCallback } from 'react';

export function usePolling(
  apiFn: () => Promise<void>,
  interval: number,
  isActive: boolean
) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startPolling = useCallback(() => {
    if (intervalRef.current) return;

    apiFn();

    intervalRef.current = setInterval(() => {
      apiFn();
    }, interval);
  }, [apiFn, interval]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      startPolling();
    } else {
      stopPolling();
    }

    return () => {
      stopPolling();
    };
  }, [isActive, startPolling, stopPolling]);

  return { startPolling, stopPolling };
}