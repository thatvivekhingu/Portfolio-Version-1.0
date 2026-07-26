import { useEffect, useState } from 'react';

export interface GitHubContribution {
  date: string;
  count: number;
  level: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';
}

export interface GitHubData {
  contributions: GitHubContribution[];
  totalContributions: number;
  period: string;
}

interface UseGitHubReturn {
  data: GitHubData | null;
  isLoading: boolean;
  error: string | null;
}

export function useGitHub(): UseGitHubReturn {
  const [data, setData] = useState<GitHubData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const response = await fetch('/api/github', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const result = await response.json();

        if (result && !result.error) {
          setData(result);
          setError(null);
        } else {
          setError(result.error || 'Unknown error');
        }
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
        // Keep previous data on error for graceful degradation
      } finally {
        setIsLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  return { data, isLoading, error };
}
