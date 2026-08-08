import { NextRequest, NextResponse } from 'next/server';

const activeSessions = new Map<string, number>();
let globalRealCount = 1;

function cleanupSessions() {
  const now = Date.now();
  const TIMEOUT = 45000;
  for (const [sid, lastSeen] of activeSessions.entries()) {
    if (now - lastSeen > TIMEOUT) {
      activeSessions.delete(sid);
    }
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sid = searchParams.get('sid') || 'guest_' + Math.random().toString(36).substring(2, 9);
  const isHeartbeat = searchParams.get('heartbeat') === 'true';

  cleanupSessions();
  activeSessions.set(sid, Date.now());

  if (!isHeartbeat) {
    try {
      const res = await fetch(
        'https://api.visitorbadge.io/api/visitors?path=thatvivekhingu-real-portfolio',
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          },
          cache: 'no-store',
          signal: AbortSignal.timeout(4000),
        }
      );

      if (res.ok) {
        const svgText = await res.text();
        const match = svgText.match(/font-weight="bold">(\d+)<\/text>/);
        if (match && match[1]) {
          const parsed = parseInt(match[1], 10);
          if (!isNaN(parsed) && parsed > 0) {
            globalRealCount = parsed;
          }
        }
      }
    } catch {
      globalRealCount += 1;
    }
  }

  const realActiveCount = Math.max(1, activeSessions.size);

  return NextResponse.json({
    totalVisits: globalRealCount,
    activeNow: realActiveCount,
    label: `${globalRealCount.toLocaleString()} real page views`,
  });
}
