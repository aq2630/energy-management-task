import { SiteInfo, AlarmSummary, EnergyData } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

const mockSites: Record<string, { siteInfo: SiteInfo, alarmSummary: AlarmSummary, energyStats: EnergyData[] }> = {
  '1': {
    siteInfo: {
      id: '1',
      name: 'Solar Farm Alpha',
      location: 'Arizona, USA',
      mode: 'Grid Following',
    },
    alarmSummary: {
      siteDown: 0,
      critical: 2,
      major: 5,
      minor: 8,
    },
    energyStats: [
      { date: '2024-01-10', solar: 450, grid: 120 },
      { date: '2024-01-11', solar: 480, grid: 100 },
      { date: '2024-01-12', solar: 420, grid: 150 },
      { date: '2024-01-13', solar: 500, grid: 80 },
      { date: '2024-01-14', solar: 490, grid: 90 },
      { date: '2024-01-15', solar: 510, grid: 70 },
      { date: '2024-01-16', solar: 470, grid: 110 },
    ],
  },
  '2': {
    siteInfo: {
      id: '2',
      name: 'Wind Farm Beta',
      location: 'Texas, USA',
      mode: 'Microgrid',
    },
    alarmSummary: {
      siteDown: 1,
      critical: 3,
      major: 4,
      minor: 6,
    },
    energyStats: [
      { date: '2024-01-10', solar: 200, grid: 300 },
      { date: '2024-01-11', solar: 220, grid: 280 },
      { date: '2024-01-12', solar: 180, grid: 320 },
      { date: '2024-01-13', solar: 240, grid: 260 },
      { date: '2024-01-14', solar: 230, grid: 270 },
      { date: '2024-01-15', solar: 250, grid: 250 },
      { date: '2024-01-16', solar: 210, grid: 290 },
    ],
  },
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const siteId = params.id;
  
  console.log('Fetching site with ID:', siteId);
  
  const siteData = mockSites[siteId];

  if (!siteData) {
    return NextResponse.json(
      { error: 'Site not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: siteData });
}