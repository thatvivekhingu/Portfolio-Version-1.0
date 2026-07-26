import { useState, useEffect } from 'react';

interface WakaTimeData {
  totalHours: number;
  isLoading: boolean;
  error: string | null;
}

const BASE_HOURS = 5223; // Your hardcoded base hours

export function useWakaTime(): WakaTimeData {
  const [totalHours, setTotalHours] = useState(BASE_HOURS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWakaTimeData() {
      try {
        const response = await fetch('/api/wakatime');

        if (!response.ok) {
          throw new Error('Failed to fetch WakaTime data');
        }

        const data = await response.json();

        // Add WakaTime hours to base hours
        const combinedHours = BASE_HOURS + (data.totalHours || 0);
        setTotalHours(combinedHours);
        setError(null);
      } catch (err) {
        console.error('WakaTime fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Keep using base hours on error
        setTotalHours(BASE_HOURS);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWakaTimeData();
  }, []);

  return { totalHours, isLoading, error };
}
