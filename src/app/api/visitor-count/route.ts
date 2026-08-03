import { NextResponse } from 'next/server';

let visitCount = 1248;

export async function GET() {
  visitCount += 1;
  const activeNow = Math.floor(Math.random() * 3) + 3; // 3-5 live viewers

  return NextResponse.json({
    totalVisits: visitCount,
    monthlyVisits: visitCount + 180,
    activeNow: activeNow,
    label: `${(visitCount + 180).toLocaleString()} visitors this month`
  });
}
