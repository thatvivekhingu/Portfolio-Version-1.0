import { useEffect, useState } from 'react';

export interface GitHubStarsData {
  stars: number;
  forks: number;
  url: string;
  repo: string;
}

interface UseGitHubStarsReturn {
  data: GitHubStarsData | null;
  isLoading: boolean;
  error: string | null;
}

export function useGitHubStars(): UseGitHubStarsReturn {
  const [data, setData] = useState<GitHubStarsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStars() {
      try {
        const response = await fetch('/api/github-stars');

        if (!response.ok) {
          throw new Error('Failed to fetch GitHub stars');
        }

        const result = await response.json();

        if (result && !result.error) {
          setData(result);
          setError(null);
        } else {
          setError(result.error || 'Unknown error');
        }
      } catch (err) {
        console.error('Error fetching GitHub stars:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch GitHub stars');
        // Keep previous data on error for graceful degradation
      } finally {
        setIsLoading(false);
      }
    }

    fetchStars();
  }, []);

  return { data, isLoading, error };
}
