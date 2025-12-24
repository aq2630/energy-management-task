'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAlarms, toggleFavorite, setSearchTerm, setLoading, setError } from '@/store/slices/alarmSlice';
import { useDebounce } from '@/hooks/useDebounce';
import Input from '@/components/common/Input';

export default function AlarmsTable() {
  const dispatch = useAppDispatch();
  const { alarms, favorites, searchTerm, loading } = useAppSelector((state) => state.alarms);
  const [localSearch, setLocalSearch] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const debouncedSearch = useDebounce(localSearch, 400);

  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    fetchAlarms();
  }, [debouncedSearch]);

  const fetchAlarms = async () => {
    try {
      dispatch(setLoading(true));
      const url = debouncedSearch 
        ? `/api/alarms?search=${encodeURIComponent(debouncedSearch)}`
        : '/api/alarms';
      const response = await fetch(url);
      const result = await response.json();
      dispatch(setAlarms(result.data));
      dispatch(setError(null));
    } catch (err) {
      dispatch(setError('Failed to fetch alarms'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleFavoriteToggle = (alarmId: string) => {
    dispatch(toggleFavorite(alarmId));
  };

  const filteredAlarms = showFavoritesOnly
    ? alarms.filter((alarm) => favorites.includes(alarm.id))
    : alarms;

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      'Site Down': 'bg-red-900',
      'Critical': 'bg-red-600',
      'Major': 'bg-orange-500',
      'Minor': 'bg-yellow-500',
    };
    return colors[severity] || 'bg-gray-500';
  };

  return (
    <div className="w-full bg-gray-900 rounded-lg p-6">
      <div className="mb-6 flex gap-4 items-center justify-between">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search alarms by code, description, or site..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            showFavoritesOnly
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-yellow-600 text-white hover:bg-yellow-700'
          }`}
        >
          {showFavoritesOnly ? 'Show All Alarms' : "⭐ Show Favorites only"}
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-8">Loading alarms...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="pb-3 text-gray-400 font-medium">Favorite</th>
                <th className="pb-3 text-gray-400 font-medium">Severity</th>
                <th className="pb-3 text-gray-400 font-medium">Site Name</th>
                <th className="pb-3 text-gray-400 font-medium">Event Code</th>
                <th className="pb-3 text-gray-400 font-medium">Description</th>
                <th className="pb-3 text-gray-400 font-medium">Start Time</th>
                <th className="pb-3 text-gray-400 font-medium">End Time</th>
                <th className="pb-3 text-gray-400 font-medium">Tags</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlarms.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    No alarms found
                  </td>
                </tr>
              ) : (
                filteredAlarms.map((alarm) => (
                  <tr key={alarm.id} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                    <td className="py-4">
                      <button
                        onClick={() => handleFavoriteToggle(alarm.id)}
                        className="text-2xl hover:scale-110 transition-transform"
                      >
                        {favorites.includes(alarm.id) ? '⭐' : '☆'}
                      </button>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${getSeverityColor(alarm.severity)}`} title={alarm.severity}></div>
                      </div>
                    </td>
                    <td className="py-4 text-gray-300">{alarm.siteName}</td>
                    <td className="py-4 text-gray-300 font-mono">{alarm.eventCode}</td>
                    <td className="py-4 text-gray-300">{alarm.description}</td>
                    <td className="py-4 text-gray-400 text-sm">
                      {new Date(alarm.startTime).toLocaleString()}
                    </td>
                    <td className="py-4 text-gray-400 text-sm">
                      {alarm.endTime ? new Date(alarm.endTime).toLocaleString() : 'Ongoing'}
                    </td>
                    <td className="py-4">
                      <div className="flex gap-1 flex-wrap">
                        {alarm.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}