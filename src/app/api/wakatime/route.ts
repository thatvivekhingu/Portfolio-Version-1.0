import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch(
        'https://wakatime.com/api/v1/users/current/all_time_since_today',
        {
          headers: {
            Authorization: `Basic ${Buffer.from(apiKey).toString('base64')}`,
          },
          signal: AbortSignal.timeout(6000),
          next: { revalidate: 3600 },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const totalSeconds = data.data.total_seconds || 0;
        const totalHours = Math.floor(totalSeconds / 3600);

        return NextResponse.json({
          totalHours,
          totalSeconds,
          text: data.data.text,
        });
      }
    } catch (error) {
      console.warn('WakaTime API fetch failed, using fallback:', error);
    }
  }

  // Graceful fallback coding hours for Vivek Hingu
  return NextResponse.json({
    totalHours: 640,
    totalSeconds: 2304000,
    text: "640 secs",
  });
}
