import { NextRequest, NextResponse } from 'next/server';

const mockAlarms = [
  {
    id: 'ALM001',
    severity: 'Critical' as const,
    siteName: 'Solar Farm A',
    eventCode: 'INV-001',
    description: 'Inverter offline',
    startTime: '2024-01-15T08:30:00Z',
    endTime: null,
    tags: ['inverter', 'power'],
  },
  {
    id: 'ALM002',
    severity: 'Major' as const,
    siteName: 'Wind Site B',
    eventCode: 'GEN-045',
    description: 'Generator temperature high',
    startTime: '2024-01-15T09:15:00Z',
    endTime: '2024-01-15T10:30:00Z',
    tags: ['generator', 'temperature'],
  },
  {
    id: 'ALM003',
    severity: 'Minor' as const,
    siteName: 'Solar Farm C',
    eventCode: 'COM-012',
    description: 'Communication delay detected',
    startTime: '2024-01-15T10:00:00Z',
    endTime: null,
    tags: ['communication'],
  },
  {
    id: 'ALM004',
    severity: 'Site Down' as const,
    siteName: 'Grid Station D',
    eventCode: 'SYS-999',
    description: 'Complete system failure',
    startTime: '2024-01-15T11:45:00Z',
    endTime: null,
    tags: ['critical', 'system'],
  },
  {
    id: 'ALM005',
    severity: 'Major' as const,
    siteName: 'Solar Farm A',
    eventCode: 'POW-034',
    description: 'Power output below threshold',
    startTime: '2024-01-15T12:20:00Z',
    endTime: null,
    tags: ['power', 'performance'],
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search')?.toLowerCase() || '';

  let filteredAlarms = mockAlarms;

  if (search) {
    filteredAlarms = mockAlarms.filter(
      (alarm) =>
        alarm.eventCode.toLowerCase().includes(search) ||
        alarm.description.toLowerCase().includes(search) ||
        alarm.siteName.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({ data: filteredAlarms });
}