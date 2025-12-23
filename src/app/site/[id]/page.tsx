'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSiteInfo, setEnergyStats, setAlarmSummary, setLoading } from '@/store/slices/siteSlice';
import AlarmSummary from '@/components/Site/AlarmSummary';
import EnergyChart from '@/components/Site/EnergyChart';
import MaintenanceDrawer from '@/components/Site/MaintenanceDrawer';
import Button from '@/components/common/Button';

export default function SiteDetailsPage() {
  const params = useParams();
  const siteId = params.id as string;
  const dispatch = useAppDispatch();
  const { siteInfo, energyStats, alarmSummary, loading } = useAppSelector((state) => state.site);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    fetchSiteData();
  }, [siteId]);

  const fetchSiteData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`/api/site/${siteId}`);
      const result = await response.json();

      console.log("result",result)
      
      if (result.data) { 
          dispatch(setSiteInfo(result.data.siteInfo));
          dispatch(setEnergyStats(result.data.energyStats));
          dispatch(setAlarmSummary(result.data.alarmSummary));
      }
    } catch (err) {
      console.error('Failed to fetch site data', err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (loading || !siteInfo) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-xl">Loading site data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{siteInfo.name}</h1>
            <div className="flex gap-4 mt-2 text-sm text-gray-400">
              <span>📍 {siteInfo.location}</span>
              <span>⚙️ Mode: <span className="text-blue-400">{siteInfo.mode}</span></span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="primary" onClick={() => setIsDrawerOpen(true)}>
              Create Ticket
            </Button>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <AlarmSummary
          siteDown={alarmSummary.siteDown}
          critical={alarmSummary.critical}
          major={alarmSummary.major}
          minor={alarmSummary.minor}
        />

        <EnergyChart energyStats={energyStats} />
      </main>

      <MaintenanceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        siteId={siteId}
        siteName={siteInfo.name}
      />
    </div>
  );
}