interface ColorData {
  r: number;
  g: number;
  b: number;
  vibrance: number;
}

const DEFAULT_FALLBACK_GRADIENT = "linear-gradient(135deg, rgba(99, 102, 241, 0.6), rgba(168, 85, 247, 0.6))";

/**
 * Extracts the top 2 most vibrant colors from an image URL and creates a gradient
 * @param imageUrl - The URL of the image to analyze
 * @returns A promise that resolves to a gradient string
 */
export async function extractVibrantColor(imageUrl: string): Promise<string> {
  if (!imageUrl) {
    return DEFAULT_FALLBACK_GRADIENT;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve(DEFAULT_FALLBACK_GRADIENT);
          return;
        }

        // Use smaller canvas for faster processing
        canvas.width = 100;
        canvas.height = 100;

        ctx.drawImage(img, 0, 0, 100, 100);
        const imageData = ctx.getImageData(0, 0, 100, 100);
        const pixels = imageData.data;

        // Collect vibrant colors
        const vibrantColors: ColorData[] = [];

        // Sample every 4th pixel for performance
        for (let i = 0; i < pixels.length; i += 16) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];

          // Skip very dark or very light colors
          const brightness = (r + g + b) / 3;
          if (brightness < 50 || brightness > 230) continue;

          // Calculate saturation and vibrance
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturation = max === 0 ? 0 : (max - min) / max;

          // Vibrance combines saturation and brightness
          const vibrance = saturation * (brightness / 255);

          // Only consider colors with reasonable vibrance
          if (vibrance > 0.2) {
            vibrantColors.push({ r, g, b, vibrance });
          }
        }

        // Sort by vibrance and get top 2
        vibrantColors.sort((a, b) => b.vibrance - a.vibrance);

        // Get the top 2 most vibrant colors, ensuring they're different enough
        const topColors: ColorData[] = [];

        if (vibrantColors.length > 0) {
          topColors.push(vibrantColors[0]);

          // Find a second color that's different from the first
          for (let i = 1; i < vibrantColors.length; i++) {
            const color = vibrantColors[i];
            const firstColor = topColors[0];

            // Check if colors are different enough (euclidean distance in RGB space)
            const distance = Math.sqrt(
              Math.pow(color.r - firstColor.r, 2) +
              Math.pow(color.g - firstColor.g, 2) +
              Math.pow(color.b - firstColor.b, 2)
            );

            if (distance > 100) {
              topColors.push(color);
              break;
            }
          }
        }

        // Fallback colors
        if (topColors.length === 0) {
          topColors.push({ r: 99, g: 102, b: 241, vibrance: 0.5 });
        }
        if (topColors.length === 1) {
          const c = topColors[0];
          const variant = {
            r: Math.min(255, c.r + 40),
            g: Math.min(255, c.g + 40),
            b: Math.min(255, c.b + 40),
            vibrance: c.vibrance
          };
          topColors.push(variant);
        }

        // Create gradient from top 2 colors
        const color1 = `rgba(${topColors[0].r}, ${topColors[0].g}, ${topColors[0].b}, 0.6)`;
        const color2 = `rgba(${topColors[1].r}, ${topColors[1].g}, ${topColors[1].b}, 0.6)`;

        resolve(`linear-gradient(135deg, ${color1}, ${color2})`);
      } catch (error) {
        console.warn("Failed extracting color from image, using default gradient:", error);
        resolve(DEFAULT_FALLBACK_GRADIENT);
      }
    };

    img.onerror = () => {
      // Gracefully resolve with default gradient instead of breaking dev overlay
      resolve(DEFAULT_FALLBACK_GRADIENT);
    };

    img.src = imageUrl;
  });
}
