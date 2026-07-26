import { useState, useEffect } from 'react';
import { extractVibrantColor } from '@/lib/colorExtractor';

/**
 * Custom hook to extract and manage vibrant colors from album cover
 * @param albumImageUrl - The URL of the album cover image
 * @returns A gradient string created from the top 2 vibrant colors
 */
export function useAlbumColor(albumImageUrl: string | null): string {
  const [color, setColor] = useState<string>('linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(200, 200, 200, 0.6))'); // Default gradient

  useEffect(() => {
    if (!albumImageUrl) {
      setColor('linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(200, 200, 200, 0.6))');
      return;
    }

    let isCancelled = false;

    extractVibrantColor(albumImageUrl)
      .then((extractedColor) => {
        if (!isCancelled) {
          setColor(extractedColor);
        }
      })
      .catch((error) => {
        console.error('Failed to extract color from album cover:', error);
        // Keep the default or previous color on error
      });

    return () => {
      isCancelled = true;
    };
  }, [albumImageUrl]);

  return color;
}
