import { useState, useEffect } from 'react';

interface SpotifyTrack {
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

interface SpotifyData {
  track: SpotifyTrack | null;
  isLoading: boolean;
  error: string | null;
}

export function useSpotify(): SpotifyData {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSpotifyData() {
      try {
        const response = await fetch('/api/spotify', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch Spotify data');
        }

        const data = await response.json();

        // Only update track if we got valid data
        if (data && !data.error) {
          setTrack(data);
          setError(null);
        } else {
          throw new Error(data.error || 'Invalid data received');
        }
      } catch (err) {
        console.error('Spotify fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Don't clear track on error - keep showing last successful data
      } finally {
        setIsLoading(false);
      }
    }

    fetchSpotifyData();
  }, []);

  return { track, isLoading, error };
}
