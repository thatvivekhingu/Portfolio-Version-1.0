"use client";

import { GitHubContribution } from '@/hooks/useGitHub';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useEffect, useState, useMemo } from 'react';

interface GitHubHeatmapProps {
  contributions: GitHubContribution[];
  isLoading: boolean;
}

const levelColors = {
  NONE: 'bg-zinc-100 dark:bg-neutral-800/50',
  FIRST_QUARTILE: 'bg-green-200 dark:bg-green-900/70',
  SECOND_QUARTILE: 'bg-green-400 dark:bg-green-700/80',
  THIRD_QUARTILE: 'bg-green-600 dark:bg-green-500/90',
  FOURTH_QUARTILE: 'bg-green-700 dark:bg-green-400',
};

export function GitHubHeatmap({ contributions, isLoading }: GitHubHeatmapProps) {
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());

  // Create placeholder data for loading state (49 days / 7 weeks)
  const placeholderData: GitHubContribution[] = useMemo(() => {
    return Array.from({ length: 49 }, (_, i) => ({
      date: new Date(Date.now() - (48 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      count: 0,
      level: 'NONE' as const,
    }));
  }, []);

  const displayContributions = isLoading ? placeholderData : contributions;

  // Group contributions into weeks (7 days each)
  const weeks: GitHubContribution[][] = [];
  for (let i = 0; i < displayContributions.length; i += 7) {
    weeks.push(displayContributions.slice(i, i + 7));
  }

  // Generate random reveal sequence
  useEffect(() => {
    if (!isLoading && contributions.length > 0) {
      setRevealedIndices(new Set()); // Reset on new data

      // Create array of all indices
      const indices = Array.from({ length: contributions.length }, (_, i) => i);

      // Shuffle array (Fisher-Yates shuffle)
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }

      // Reveal squares one by one with staggered delays
      const delay = 15; // milliseconds between each reveal

      indices.forEach((index, sequence) => {
        setTimeout(() => {
          setRevealedIndices(prev => new Set(prev).add(index));
        }, sequence * delay);
      });
    }
  }, [isLoading, contributions]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T12:00:00Z'); // Parse as UTC noon to avoid timezone shifts
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  };

  if (!displayContributions || displayContributions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-sm text-neutral-400">sorry, my access token probably expired 😕
        </div>
      </div>
    );
  }

  let flatIndex = 0;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex gap-1.5 sm:gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1.5 sm:gap-1">
              {week.map((day) => {
                const currentIndex = flatIndex++;
                const isRevealed = isLoading || revealedIndices.has(currentIndex);
                const displayLevel = isRevealed ? day.level : 'NONE';

                return (
                  <Tooltip key={day.date}>
                    <TooltipTrigger asChild>
                      <a
                        href="https://github.com/thatvivekhingu"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View GitHub profile"
                        className={`
                          block w-3.5 h-3.5 sm:w-3 sm:h-3 rounded-[2px]
                          ${levelColors[displayLevel]}
                          transition-all duration-300
                          hover:scale-125
                          cursor-pointer
                        `}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <div className="text-xs">
                        <div className="font-semibold">
                          {day.count} {day.count === 1 ? 'contribution' : 'contributions'}
                        </div>
                        <div className="text-muted-foreground">{formatDate(day.date)}</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
