import { NextResponse } from 'next/server';

export async function GET() {
  const dataPoints = [];
  const now = Date.now();
  
  for (let i = 0; i < 20; i++) {
    const timeOffset = i * 3000;
    dataPoints.push({
      timestamp: now + timeOffset,
      activePower: Math.sin((now + timeOffset) / 10000) * 50 + 100 + Math.random() * 10,
      reactivePower: Math.cos((now + timeOffset) / 10000) * 30 + 50 + Math.random() * 8,
    });
  }

  return NextResponse.json({ data: dataPoints });
}